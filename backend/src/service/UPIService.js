const QRCode = require('qrcode');
const bcryptjs = require('bcryptjs');
const { UserModel } = require('../models/User.model');
const { AccountModel } = require('../models/Account.model');
const { TransactionModel } = require('../models/Transactions.model');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

class UPIService {
    /**
     * Generate a QR code (base64 PNG) for the given user's UPI ID.
     * Optionally include amount and note to create an intent QR.
     */
    static async generateUPIQR(userId, { amount, note } = {}) {
        const user = await UserModel.findById(userId).select('upi_id name');
        if (!user || !user.upi_id) {
            throw new ApiError(404, 'User or UPI handle not found');
        }

        // Create the UPI payment URL (Paytm/BHIM compatible deep link)
        let upiUrl = `upi://pay?pa=${encodeURIComponent(user.upi_id)}&pn=${encodeURIComponent(user.name)}`;
        if (amount) {
            upiUrl += `&am=${encodeURIComponent(amount)}`;
        }
        if (note) {
            upiUrl += `&tn=${encodeURIComponent(note)}`;
        }
        upiUrl += '&cu=INR';

        // Convert to QR code (returns base64 PNG string)
        const qrDataUrl = await QRCode.toDataURL(upiUrl, { type: 'image/png', errorCorrectionLevel: 'H' });
        return {
            upi_id: user.upi_id,
            qr: qrDataUrl,
            upi_url: upiUrl,
            amount: amount || null,
            note: note || null
        };
    }

    /**
     * Register a new UPI handle and PIN for the authenticated user
     */
    static async createUPI(userId, { upi_id, pin }) {
        // Validate required params
        if (!upi_id || !pin) {
            throw new ApiError(400, 'UPI ID and PIN are required');
        }

        // Basic format validation
        const upiRegex = /^[\w.-]+@cbibank$/;
        if (!upiRegex.test(upi_id)) {
            throw new ApiError(400, 'UPI ID must end with @cbibank');
        }

        // PIN length validation (4 or 6 digits)
        const pinRegex = /^\d{4}$|^\d{6}$/;
        if (!pinRegex.test(pin)) {
            throw new ApiError(400, 'PIN must be 4 or 6 digits');
        }

        // Ensure uniqueness of the handle
        const existing = await UserModel.findOne({ upi_id });
        if (existing) {
            throw new ApiError(400, 'UPI ID is already taken');
        }

        // Hash the PIN before storing
        const hashedPin = await bcryptjs.hash(pin, 10);

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { upi_id, upi_pin: hashedPin },
            { new: true }
        ).select('upi_id');

        if (!updatedUser) {
            throw new ApiError(404, 'User not found');
        }

        return {
            upi_id: updatedUser.upi_id
        };
    }

    /**
     * Process UPI payment between two UPI IDs
     */
    static async processUPIPayment(senderId, { recipient_upi, amount, note, pin }) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Validate sender
            // Include +upi_pin because the field is excluded by default for security
            const sender = await UserModel.findById(senderId).select('+upi_pin').populate('account_no');
            if (!sender || !sender.upi_id) {
                throw new ApiError(404, 'Sender UPI ID not found');
            }

            // Validate recipient UPI
            const recipient = await UserModel.findOne({ upi_id: recipient_upi }).populate('account_no');
            if (!recipient) {
                throw new ApiError(404, 'Recipient UPI ID not found');
            }

            // Get sender's primary account
            const senderAccount = sender.account_no[0];
            if (!senderAccount) {
                throw new ApiError(404, 'Sender account not found');
            }

            // Get recipient's primary account
            const recipientAccount = recipient.account_no[0];
            if (!recipientAccount) {
                throw new ApiError(404, 'Recipient account not found');
            }

            // Validate amount
            const transferAmount = parseFloat(amount);
            if (transferAmount <= 0) {
                throw new ApiError(400, 'Invalid amount');
            }

            // Check sufficient balance
            if (senderAccount.amount < transferAmount) {
                throw new ApiError(400, 'Insufficient balance');
            }

            // Validate UPI PIN
            if (!pin) {
                throw new ApiError(400, 'UPI PIN is required');
            }

            const isPinValid = await bcryptjs.compare(pin, sender.upi_pin || '');
            if (!isPinValid) {
                throw new ApiError(401, 'Invalid UPI PIN');
            }

            // Debit from sender
            await AccountModel.findByIdAndUpdate(
                senderAccount._id,
                { $inc: { amount: -transferAmount } },
                { session }
            );

            // Credit to recipient
            await AccountModel.findByIdAndUpdate(
                recipientAccount._id,
                { $inc: { amount: transferAmount } },
                { session }
            );

            // Create transaction records
            const transactionData = {
                amount: transferAmount,
                type: 'upi_transfer',
                isSuccess: true,
                remark: note || `UPI transfer to ${recipient.name}`,
                recipient_upi: recipient_upi,
                sender_upi: sender.upi_id
            };

            // Sender transaction (debit)
            await TransactionModel.create([{
                ...transactionData,
                user: senderId,
                account: senderAccount._id,
                type: 'debit',
                remark: `UPI payment to ${recipient.name} (${recipient_upi})`
            }], { session });

            // Recipient transaction (credit)
            await TransactionModel.create([{
                ...transactionData,
                user: recipient._id,
                account: recipientAccount._id,
                type: 'credit',
                remark: `UPI payment from ${sender.name} (${sender.upi_id})`
            }], { session });

            await session.commitTransaction();

            return {
                transaction_id: new mongoose.Types.ObjectId().toString(),
                amount: transferAmount,
                sender_upi: sender.upi_id,
                recipient_upi: recipient_upi,
                status: 'success',
                timestamp: new Date(),
                note: note || null
            };

        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    /**
     * Get UPI transaction history for a user
     */
    static async getUPITransactions(userId, { page = 1, limit = 10 } = {}) {
        const user = await UserModel.findById(userId).populate('account_no');
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        const accountIds = user.account_no.map(acc => acc._id);

        const transactions = await TransactionModel.find({
            account: { $in: accountIds },
            $or: [
                { sender_upi: { $exists: true } },
                { recipient_upi: { $exists: true } }
            ]
        })
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .select('amount type remark createdAt sender_upi recipient_upi isSuccess');

        const total = await TransactionModel.countDocuments({
            account: { $in: accountIds },
            $or: [
                { sender_upi: { $exists: true } },
                { recipient_upi: { $exists: true } }
            ]
        });

        return {
            transactions,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalTransactions: total
        };
    }

    /**
     * Validate UPI ID format and existence
     */
    static async validateUPIID(upi_id) {
        // Basic UPI ID format validation
        const upiRegex = /^[\w.-]+@[\w.-]+$/;
        if (!upiRegex.test(upi_id)) {
            return { valid: false, message: 'Invalid UPI ID format' };
        }

        // Check if UPI ID exists in our system
        const user = await UserModel.findOne({ upi_id }).select('name upi_id');
        if (!user) {
            return { valid: false, message: 'UPI ID not found' };
        }

        return {
            valid: true,
            user: {
                name: user.name,
                upi_id: user.upi_id
            }
        };
    }

    /**
     * Get UPI payment limits and settings
     */
    static async getUPILimits(userId) {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // Default UPI limits (can be made configurable per user)
        return {
            daily_limit: 100000, // ₹1,00,000
            per_transaction_limit: 50000, // ₹50,000
            monthly_limit: 1000000, // ₹10,00,000
            remaining_daily_limit: 100000, // This should be calculated based on today's transactions
            remaining_monthly_limit: 1000000 // This should be calculated based on current month's transactions
        };
    }

    /**
     * Generate dynamic UPI QR with payment intent
     */
    static async generatePaymentQR(userId, paymentData) {
        const user = await UserModel.findById(userId).select('upi_id name');
        if (!user || !user.upi_id) {
            throw new ApiError(404, 'User or UPI handle not found');
        }

        const { amount, note, merchant_code } = paymentData;
        
        // Create enhanced UPI URL with merchant details
        let upiUrl = `upi://pay?pa=${encodeURIComponent(user.upi_id)}&pn=${encodeURIComponent(user.name)}`;
        
        if (amount) {
            upiUrl += `&am=${encodeURIComponent(amount)}`;
        }
        if (note) {
            upiUrl += `&tn=${encodeURIComponent(note)}`;
        }
        if (merchant_code) {
            upiUrl += `&mc=${encodeURIComponent(merchant_code)}`;
        }
        
        upiUrl += '&cu=INR';
        upiUrl += `&tr=${Date.now()}`; // Unique transaction reference

        const qrDataUrl = await QRCode.toDataURL(upiUrl, { 
            type: 'image/png', 
            errorCorrectionLevel: 'H',
            width: 300,
            margin: 2
        });

        return {
            upi_id: user.upi_id,
            qr: qrDataUrl,
            upi_url: upiUrl,
            payment_data: paymentData,
            expires_at: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
        };
    }
}

module.exports = UPIService;