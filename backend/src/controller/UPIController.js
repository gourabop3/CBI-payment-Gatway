const UPIService = require('../service/UPIService');

class UPIController {
    static async generateQR(req, res, next) {
        try {
            const data = await UPIService.generateUPIQR(req.user, {
                amount: req.query.amount,
                note: req.query.note,
            });
            res.json({
                msg: 'UPI QR generated',
                ...data,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UPIController;