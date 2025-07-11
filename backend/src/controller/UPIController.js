const UPIService = require('../service/UPIService');

class UPIController {
    /**
     * Generate UPI QR code
     */
    static async generateQR(req, res, next) {
        try {
            const data = await UPIService.generateUPIQR(req.user, {
                amount: req.query.amount,
                note: req.query.note,
            });
            res.json({
                success: true,
                msg: 'UPI QR generated successfully',
                data
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Create or update UPI ID
     */
    static async createUPIId(req, res, next) {
        try {
            const data = await UPIService.createUPIId(req.user, req.body);
            res.json({
                success: true,
                msg: data.message,
                data
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Verify UPI PIN
     */
    static async verifyUPIPin(req, res, next) {
        try {
            await UPIService.verifyUPIPin(req.user, req.body.upi_pin);
            res.json({
                success: true,
                msg: 'UPI PIN verified successfully'
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Change UPI PIN
     */
    static async changeUPIPin(req, res, next) {
        try {
            const data = await UPIService.changeUPIPin(req.user, req.body);
            res.json({
                success: true,
                msg: data.message
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Process UPI payment
     */
    static async processPayment(req, res, next) {
        try {
            const data = await UPIService.processUPIPayment(req.user, req.body);
            res.json({
                success: true,
                msg: data.message,
                data
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Get UPI transaction history
     */
    static async getTransactions(req, res, next) {
        try {
            const data = await UPIService.getUPITransactions(req.user, {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.limit) || 10,
                type: req.query.type
            });
            res.json({
                success: true,
                msg: 'UPI transactions retrieved successfully',
                data
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Search UPI ID
     */
    static async searchUPIId(req, res, next) {
        try {
            const data = await UPIService.searchUPIId(req.query.upi_id);
            res.json({
                success: true,
                msg: 'UPI ID found',
                data
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Get UPI profile
     */
    static async getUPIProfile(req, res, next) {
        try {
            const data = await UPIService.getUPIProfile(req.user);
            res.json({
                success: true,
                msg: 'UPI profile retrieved successfully',
                data
            });
        } catch (err) {
            next(err);
        }
    }

    /**
     * Get UPI statistics
     */
    static async getUPIStats(req, res, next) {
        try {
            const { UPITransactionModel } = require('../models/UPITransaction.model');
            
            // Get total transactions count
            const totalTransactions = await UPITransactionModel.countDocuments({
                $or: [
                    { sender: req.user },
                    { receiver: req.user }
                ]
            });

            // Get total amount sent
            const totalSent = await UPITransactionModel.aggregate([
                {
                    $match: {
                        sender: req.user,
                        status: 'completed'
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$amount' }
                    }
                }
            ]);

            // Get total amount received
            const totalReceived = await UPITransactionModel.aggregate([
                {
                    $match: {
                        receiver: req.user,
                        status: 'completed'
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$amount' }
                    }
                }
            ]);

            res.json({
                success: true,
                msg: 'UPI statistics retrieved successfully',
                data: {
                    totalTransactions,
                    totalSent: totalSent[0]?.total || 0,
                    totalReceived: totalReceived[0]?.total || 0
                }
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UPIController;