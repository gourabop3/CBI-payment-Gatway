const QRCode = require('qrcode');
const bcryptjs = require('bcryptjs');
const { UserModel } = require('../models/User.model');
const { UPITransactionModel } = require('../models/UPITransaction.model');
const { AccountModel } = require('../models/Account.model');
const { TransactionsModel } = require('../models/Transactions.model');
const ApiError = require('../utils/ApiError');

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
        };
    }

    /**
     * Create or update UPI ID for a user
     */
    static async createUPIId(userId, { upi_id, upi_pin }) {
        // Validate UPI ID format
        if (!upi_id || !upi_id.includes('@')) {
            throw new ApiError(400, 'Invalid UPI ID format. Must include @ symbol (e.g., username@cbibank)');
        }

        // Check if UPI ID already exists
        const existingUser = await UserModel.findOne({ upi_id });
        if (existingUser && existingUser._id.toString() !== userId) {
            throw new ApiError(400, 'UPI ID already exists');
        }

        // Validate PIN format
        if (!upi_pin || upi_pin.length !== 6 || !/^\d{6}$/.test(upi_pin)) {
            throw new ApiError(400, 'UPI PIN must be exactly 6 digits');
        }

        // Update user with UPI ID and PIN
        const user = await UserModel.findByIdAndUpdate(
            userId,
            {
                upi_id,
                upi_pin,
                upi_pin_setup: true
            },
            { new: true }
        ).select('upi_id name upi_pin_setup');

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        return {
            upi_id: user.upi_id,
            upi_pin_setup: user.upi_pin_setup,
            message: 'UPI ID created successfully'
        };
    }

    /**
     * Verify UPI PIN for a user
     */
    static async verifyUPIPin(userId, upi_pin) {
        const user = await UserModel.findById(userId).select('upi_pin upi_pin_setup');
        
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        if (!user.upi_pin_setup) {
            throw new ApiError(400, 'UPI PIN not set up. Please set up your UPI PIN first');
        }

        const isValidPin = await bcryptjs.compare(upi_pin, user.upi_pin);
        if (!isValidPin) {
            throw new ApiError(400, 'Invalid UPI PIN');
        }

        return true;
    }

    /**
     * Change UPI PIN
     */
    static async changeUPIPin(userId, { current_pin, new_pin }) {
        // Verify current PIN
        await this.verifyUPIPin(userId, current_pin);

        // Validate new PIN
        if (!new_pin || new_pin.length !== 6 || !/^\d{6}$/.test(new_pin)) {
            throw new ApiError(400, 'New UPI PIN must be exactly 6 digits');
        }

        // Update PIN
        await UserModel.findByIdAndUpdate(userId, {
            upi_pin: new_pin
        });

        return {
            message: 'UPI PIN changed successfully'
        };
    }

    /**
     * Process UPI payment with PIN verification
     */
    static async processUPIPayment(senderId, { receiverUpiId, amount, note, upi_pin, accountId }) {
        // Verify sender's UPI PIN
        await this.verifyUPIPin(senderId, upi_pin);

        // Find receiver by UPI ID
        const receiver = await UserModel.findOne({ upi_id: receiverUpiId });
        if (!receiver) {
            throw new ApiError(404, 'Receiver UPI ID not found');
        }

        if (receiver._id.toString() === senderId) {
            throw new ApiError(400, 'Cannot send money to yourself');
        }

        // Validate amount
        if (!amount || amount < 1) {
            throw new ApiError(400, 'Invalid amount');
        }

        // Check sender's account balance
        const senderAccount = await AccountModel.findById(accountId);
        if (!senderAccount || senderAccount.user.toString() !== senderId) {
            throw new ApiError(404, 'Account not found or not authorized');
        }

        if (senderAccount.amount < amount) {
            throw new ApiError(400, 'Insufficient balance');
        }

        // Generate transaction ID
        const transactionId = this.generateTransactionId();

        // Create UPI transaction record
        const upiTransaction = await UPITransactionModel.create({
            transactionId,
            sender: senderId,
            receiver: receiver._id,
            senderUpiId: (await UserModel.findById(senderId)).upi_id,
            receiverUpiId,
            amount,
            note,
            type: 'send',
            account: accountId,
            status: 'pending'
        });

        try {
            // Process the transaction
            await this.executeUPITransaction(upiTransaction._id);
            
            return {
                transactionId,
                status: 'success',
                message: 'Payment successful',
                amount,
                receiver: receiver.name
            };
        } catch (error) {
            // Update transaction status to failed
            await UPITransactionModel.findByIdAndUpdate(upiTransaction._id, {
                status: 'failed',
                failureReason: error.message
            });
            throw error;
        }
    }

    /**
     * Execute UPI transaction (transfer money between accounts)
     */
    static async executeUPITransaction(transactionId) {
        const transaction = await UPITransactionModel.findById(transactionId)
            .populate('sender', 'upi_id')
            .populate('receiver', 'upi_id');

        if (!transaction) {
            throw new ApiError(404, 'Transaction not found');
        }

        // Get sender's account
        const senderAccount = await AccountModel.findById(transaction.account);
        if (!senderAccount) {
            throw new ApiError(404, 'Sender account not found');
        }

        // Get receiver's account (primary account)
        const receiverAccount = await AccountModel.findOne({ user: transaction.receiver });
        if (!receiverAccount) {
            throw new ApiError(404, 'Receiver account not found');
        }

        // Check sender balance again
        if (senderAccount.amount < transaction.amount) {
            throw new ApiError(400, 'Insufficient balance');
        }

        // Perform the transfer
        await AccountModel.findByIdAndUpdate(senderAccount._id, {
            $inc: { amount: -transaction.amount }
        });

        await AccountModel.findByIdAndUpdate(receiverAccount._id, {
            $inc: { amount: transaction.amount }
        });

        // Create transaction records
        await TransactionsModel.create({
            user: transaction.sender,
            account: transaction.account,
            type: 'debit',
            amount: transaction.amount,
            description: `UPI Payment to ${transaction.receiverUpiId}`,
            reference: transaction.transactionId,
            category: 'upi_transfer'
        });

        await TransactionsModel.create({
            user: transaction.receiver,
            account: receiverAccount._id,
            type: 'credit',
            amount: transaction.amount,
            description: `UPI Payment from ${transaction.senderUpiId}`,
            reference: transaction.transactionId,
            category: 'upi_transfer'
        });

        // Update UPI transaction status
        await UPITransactionModel.findByIdAndUpdate(transactionId, {
            status: 'completed',
            processedAt: new Date()
        });
    }

    /**
     * Get UPI transaction history
     */
    static async getUPITransactions(userId, { page = 1, limit = 10, type } = {}) {
        const query = {
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        };

        if (type) {
            query.type = type;
        }

        const transactions = await UPITransactionModel.find(query)
            .populate('sender', 'name upi_id')
            .populate('receiver', 'name upi_id')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await UPITransactionModel.countDocuments(query);

        return {
            transactions,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }

    /**
     * Generate unique transaction ID
     */
    static generateTransactionId() {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `UPI${timestamp.slice(-8)}${random}`;
    }

    /**
     * Search UPI ID
     */
    static async searchUPIId(upiId) {
        const user = await UserModel.findOne({ upi_id: upiId })
            .select('name upi_id')
            .populate('account_no', 'ac_type');

        if (!user) {
            throw new ApiError(404, 'UPI ID not found');
        }

        return {
            name: user.name,
            upi_id: user.upi_id,
            account_type: user.account_no[0]?.ac_type || 'saving'
        };
    }

    /**
     * Get UPI profile for a user
     */
    static async getUPIProfile(userId) {
        const user = await UserModel.findById(userId)
            .select('name upi_id upi_pin_setup')
            .populate('account_no', 'ac_type amount');

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        return {
            name: user.name,
            upi_id: user.upi_id,
            upi_pin_setup: user.upi_pin_setup,
            accounts: user.account_no
        };
    }
}

module.exports = UPIService;