const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/User.model');
const { ProfileModel } = require('../models/Profile.model');
const { TransactionModel } = require('../models/Transactions.model');
const { RechargeModel } = require('../models/Recharge.model');
const { AccountModel } = require('../models/Account.model');
const PDFDocument = require('pdfkit');
const NodeMailerService = require('../utils/NodeMail');
const fs = require('fs');
const path = require('path');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || '@@adminjwt';

class AdminService {
    static async loginAdmin(body) {
        const { email, password } = body;
        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            throw new ApiError(401, 'Invalid admin credentials');
        }
        const token = jwt.sign({ isAdmin: true }, ADMIN_JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });
        return { msg: 'Admin login success', token };
    }

    static async toggleUserActivation(userId, state){
        await UserModel.findByIdAndUpdate(userId,{ isActive: state});
        return {msg: `User account has been ${state? 'activated':'deactivated'}`}
    }

    static async updateUserProfile(userId, body){
        await UserModel.findByIdAndUpdate(
            userId,
            {
                name: body.name,
                email: body.email
            },
            { new: true, runValidators: true }
        );

        await ProfileModel.findOneAndUpdate(
            { user: userId },
            {
                mobile_no: body.mobile_no,
                bio: body.bio,
                lastProfileUpdate: new Date()
            },
            { new: true }
        );
        return {msg:'Profile updated by admin'}
    }

    static async listUsers(){
        const users = await UserModel.find().select('name email isActive createdAt');
        return users;
    }

    static async getAllTransactions(filters = {}) {
        const { page = 1, limit = 50, userId, type, startDate, endDate } = filters;
        
        // Build query conditions
        let transactionQuery = {};
        let rechargeQuery = {};
        
        if (userId) {
            transactionQuery.user = userId;
            rechargeQuery.user = userId;
        }
        
        if (type) {
            if (['mobile', 'bill'].includes(type)) {
                rechargeQuery.rechargeType = type;
            } else {
                transactionQuery.type = type;
            }
        }
        
        if (startDate || endDate) {
            const dateQuery = {};
            if (startDate) dateQuery.$gte = new Date(startDate);
            if (endDate) dateQuery.$lte = new Date(endDate);
            
            transactionQuery.createdAt = dateQuery;
            rechargeQuery.createdAt = dateQuery;
        }
        
        // Get transactions with user and account details
        const transactions = await TransactionModel.find(transactionQuery)
            .populate('user', 'name email')
            .populate('account', 'ac_type')
            .sort({ createdAt: -1 })
            .limit(limit * 2) // Get more to account for recharges
            .lean();
        
        // Get recharges with user and account details
        const recharges = await RechargeModel.find(rechargeQuery)
            .populate('user', 'name email')
            .populate('account', 'ac_type')
            .sort({ createdAt: -1 })
            .limit(limit * 2)
            .lean();
        
        // Transform recharges to match transaction format
        const transformedRecharges = recharges.map(recharge => ({
            _id: recharge._id,
            user: recharge.user,
            account: recharge.account,
            amount: recharge.amount,
            type: recharge.rechargeType,
            isSuccess: recharge.status === 'success',
            remark: recharge.description,
            createdAt: recharge.createdAt,
            updatedAt: recharge.updatedAt,
            transactionId: recharge.transactionId,
            // Recharge specific fields
            mobileNumber: recharge.mobileNumber,
            operator: recharge.operator,
            billType: recharge.billType,
            consumerNumber: recharge.consumerNumber,
            isRecharge: true
        }));
        
        // Combine and sort all transactions
        const allTransactions = [...transactions, ...transformedRecharges]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice((page - 1) * limit, page * limit);
        
        // Get total count for pagination
        const totalTransactions = await TransactionModel.countDocuments(transactionQuery);
        const totalRecharges = await RechargeModel.countDocuments(rechargeQuery);
        const total = totalTransactions + totalRecharges;
        
        return {
            transactions: allTransactions,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalTransactions: total,
                limit
            }
        };
    }

    static async generateStatement(userId, options = {}) {
        const { startDate, endDate, sendEmail = true } = options;
        
        // Get user details
        const user = await UserModel.findById(userId).populate('account_no');
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        
        // Set default date range (last 3 months if not specified)
        const defaultEndDate = new Date();
        const defaultStartDate = new Date();
        defaultStartDate.setMonth(defaultStartDate.getMonth() - 3);
        
        const filterStartDate = startDate ? new Date(startDate) : defaultStartDate;
        const filterEndDate = endDate ? new Date(endDate) : defaultEndDate;
        
        // Get transactions for the period
        const transactions = await TransactionModel.find({
            user: userId,
            createdAt: { $gte: filterStartDate, $lte: filterEndDate }
        }).populate('account').sort({ createdAt: -1 });
        
        // Get recharges for the period
        const recharges = await RechargeModel.find({
            user: userId,
            createdAt: { $gte: filterStartDate, $lte: filterEndDate }
        }).sort({ createdAt: -1 });
        
        // Combine and sort transactions
        const allTransactions = [
            ...transactions.map(t => ({ ...t.toObject(), isRecharge: false })),
            ...recharges.map(r => ({ ...r.toObject(), isRecharge: true }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Generate PDF
        const pdfPath = await this.createStatementPDF(user, allTransactions, filterStartDate, filterEndDate);
        
        // Send email with PDF attachment
        if (sendEmail) {
            await this.sendStatementEmail(user, pdfPath, filterStartDate, filterEndDate);
            
            // Clean up PDF file after sending
            fs.unlinkSync(pdfPath);
        }
        
        return {
            msg: 'Account statement generated successfully',
            transactionCount: allTransactions.length,
            period: {
                startDate: filterStartDate,
                endDate: filterEndDate
            },
            emailSent: sendEmail
        };
    }

    static async createStatementPDF(user, transactions, startDate, endDate) {
        return new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument({ margin: 50 });
                const filename = `statement_${user._id}_${Date.now()}.pdf`;
                const filePath = path.join(__dirname, '../../temp', filename);
                
                // Ensure temp directory exists
                const tempDir = path.dirname(filePath);
                if (!fs.existsSync(tempDir)) {
                    fs.mkdirSync(tempDir, { recursive: true });
                }
                
                doc.pipe(fs.createWriteStream(filePath));
                
                // Header
                doc.fontSize(20).text('CBI BANK', 50, 50);
                doc.fontSize(16).text('Account Statement', 50, 80);
                
                // User Information
                doc.fontSize(12)
                   .text(`Account Holder: ${user.name}`, 50, 120)
                   .text(`Email: ${user.email}`, 50, 140)
                   .text(`Statement Period: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`, 50, 160)
                   .text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 180);
                
                // Account Details
                if (user.account_no && user.account_no.length > 0) {
                    const primaryAccount = user.account_no[0];
                    doc.text(`Account Type: ${primaryAccount.ac_type}`, 50, 200)
                       .text(`Current Balance: ₹${primaryAccount.amount.toLocaleString()}`, 50, 220);
                }
                
                // Transaction Table Header
                let yPosition = 260;
                doc.fontSize(10)
                   .text('Date', 50, yPosition)
                   .text('Description', 120, yPosition)
                   .text('Type', 300, yPosition)
                   .text('Amount', 400, yPosition)
                   .text('Balance', 470, yPosition);
                
                // Draw line under header
                yPosition += 15;
                doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
                
                // Transaction Details
                yPosition += 10;
                let runningBalance = user.account_no && user.account_no.length > 0 ? user.account_no[0].amount : 0;
                
                transactions.forEach((transaction, index) => {
                    if (yPosition > 700) {
                        doc.addPage();
                        yPosition = 50;
                    }
                    
                    const date = new Date(transaction.createdAt).toLocaleDateString();
                    const description = transaction.isRecharge 
                        ? transaction.description || `${transaction.rechargeType} recharge`
                        : transaction.remark || 'Banking transaction';
                    const type = transaction.isRecharge ? transaction.rechargeType : transaction.type;
                    const amount = transaction.amount;
                    const amountDisplay = transaction.type === 'credit' || (transaction.isRecharge && transaction.status === 'success') 
                        ? `+₹${amount.toLocaleString()}` 
                        : `-₹${amount.toLocaleString()}`;
                    
                    doc.text(date, 50, yPosition)
                       .text(description.substring(0, 25), 120, yPosition)
                       .text(type, 300, yPosition)
                       .text(amountDisplay, 400, yPosition)
                       .text(`₹${runningBalance.toLocaleString()}`, 470, yPosition);
                    
                    yPosition += 20;
                });
                
                // Summary
                yPosition += 20;
                const totalCredits = transactions.filter(t => 
                    t.type === 'credit' || (t.isRecharge && t.status === 'success')
                ).reduce((sum, t) => sum + t.amount, 0);
                
                const totalDebits = transactions.filter(t => 
                    t.type === 'debit' || (t.isRecharge && t.status === 'success')
                ).reduce((sum, t) => sum + t.amount, 0);
                
                doc.fontSize(12)
                   .text(`Total Credits: ₹${totalCredits.toLocaleString()}`, 50, yPosition)
                   .text(`Total Debits: ₹${totalDebits.toLocaleString()}`, 50, yPosition + 20)
                   .text(`Transaction Count: ${transactions.length}`, 50, yPosition + 40);
                
                doc.end();
                
                doc.on('end', () => {
                    resolve(filePath);
                });
                
            } catch (error) {
                reject(error);
            }
        });
    }

    static async sendStatementEmail(user, pdfPath, startDate, endDate) {
        const emailOptions = {
            to: user.email,
            subject: `Account Statement - ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2563eb;">Account Statement</h2>
                    <p>Dear ${user.name},</p>
                    <p>Please find attached your account statement for the period ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}.</p>
                    <p>If you have any questions regarding your statement, please contact our customer support.</p>
                    <br>
                    <p>Best regards,<br>CBI Bank</p>
                </div>
            `,
            attachments: [{
                filename: `Account_Statement_${startDate.getMonth() + 1}-${startDate.getFullYear()}.pdf`,
                path: pdfPath
            }]
        };
        
        await NodeMailerService.sendEmail(emailOptions);
    }
}

module.exports = AdminService;