const QRCode = require('qrcode');
const { UserModel } = require('../models/User.model');
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
}

module.exports = UPIService;