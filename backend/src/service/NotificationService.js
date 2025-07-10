const NodeMailerService = require("../utils/NodeMail");
const { AnnouncementModel } = require("../models/Announcement.model");
const { UserModel } = require("../models/User.model");

class NotificationService {
    /**
     * Send transfer sent confirmation email
     */
    static async sendTransferSentEmail(senderName, senderEmail, amount, recipientName, recipientAccountNumber, transferType, transferId) {
        try {
            await NodeMailerService.sendEmail({
                to: senderEmail,
                subject: `Transfer Successful - ₹${amount.toLocaleString()} Sent`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2563eb; margin: 0;">CBI Bank</h1>
                                <h2 style="color: #059669; margin: 10px 0;">Transfer Successful ✓</h2>
                            </div>
                            
                            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: #1e40af; margin-top: 0;">Transaction Details</h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Amount Transferred:</td>
                                        <td style="padding: 8px 0; text-align: right; color: #dc2626; font-size: 18px; font-weight: bold;">₹${amount.toLocaleString()}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">To:</td>
                                        <td style="padding: 8px 0; text-align: right;">${recipientName}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Account Number:</td>
                                        <td style="padding: 8px 0; text-align: right; font-family: monospace;">${recipientAccountNumber}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Transfer Type:</td>
                                        <td style="padding: 8px 0; text-align: right;">${transferType}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: bold;">Transaction ID:</td>
                                        <td style="padding: 8px 0; text-align: right; font-family: monospace; font-size: 12px;">${transferId}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <p style="margin: 0; color: #92400e;">
                                    <strong>📱 SMS Alert:</strong> You will receive an SMS confirmation shortly.
                                </p>
                            </div>
                            
                            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-bottom: 0;">
                                If you did not initiate this transfer, please contact us immediately.<br>
                                This is an automated email from CBI Bank. Please do not reply.
                            </p>
                        </div>
                    </div>
                `
            });
        } catch (error) {
            console.error("Failed to send transfer sent email:", error);
        }
    }

    /**
     * Send transfer received notification email
     */
    static async sendTransferReceivedEmail(recipientName, recipientEmail, amount, senderName, senderAccountNumber, transferType, transferId) {
        try {
            await NodeMailerService.sendEmail({
                to: recipientEmail,
                subject: `Money Received - ₹${amount.toLocaleString()} Credited`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2563eb; margin: 0;">CBI Bank</h1>
                                <h2 style="color: #059669; margin: 10px 0;">Money Received! 💰</h2>
                            </div>
                            
                            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: #166534; margin-top: 0;">Credit Transaction Details</h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Amount Received:</td>
                                        <td style="padding: 8px 0; text-align: right; color: #059669; font-size: 18px; font-weight: bold;">₹${amount.toLocaleString()}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">From:</td>
                                        <td style="padding: 8px 0; text-align: right;">${senderName}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Sender Account:</td>
                                        <td style="padding: 8px 0; text-align: right; font-family: monospace;">${senderAccountNumber}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Transfer Type:</td>
                                        <td style="padding: 8px 0; text-align: right;">${transferType}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: bold;">Transaction ID:</td>
                                        <td style="padding: 8px 0; text-align: right; font-family: monospace; font-size: 12px;">${transferId}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <p style="margin: 0; color: #1e40af;">
                                    <strong>💳 Balance Update:</strong> The amount has been credited to your account instantly.
                                </p>
                            </div>
                            
                            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-bottom: 0;">
                                If you have any questions about this transaction, please contact us.<br>
                                This is an automated email from CBI Bank. Please do not reply.
                            </p>
                        </div>
                    </div>
                `
            });
        } catch (error) {
            console.error("Failed to send transfer received email:", error);
        }
    }

    /**
     * Send ATM card transaction email
     */
    static async sendATMTransactionEmail(userName, userEmail, amount, location, transactionType, atmId) {
        try {
            const isWithdrawal = transactionType.toLowerCase() === 'withdrawal';
            const subject = `ATM ${transactionType} Alert - ₹${amount.toLocaleString()}`;
            
            await NodeMailerService.sendEmail({
                to: userEmail,
                subject: subject,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2563eb; margin: 0;">CBI Bank</h1>
                                <h2 style="color: ${isWithdrawal ? '#dc2626' : '#059669'}; margin: 10px 0;">ATM ${transactionType} Alert 🏧</h2>
                            </div>
                            
                            <div style="background-color: ${isWithdrawal ? '#fef2f2' : '#f0fdf4'}; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: ${isWithdrawal ? '#991b1b' : '#166534'}; margin-top: 0;">Transaction Details</h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Amount:</td>
                                        <td style="padding: 8px 0; text-align: right; color: ${isWithdrawal ? '#dc2626' : '#059669'}; font-size: 18px; font-weight: bold;">₹${amount.toLocaleString()}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Transaction Type:</td>
                                        <td style="padding: 8px 0; text-align: right;">${transactionType}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Location:</td>
                                        <td style="padding: 8px 0; text-align: right;">${location}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">ATM ID:</td>
                                        <td style="padding: 8px 0; text-align: right; font-family: monospace;">${atmId}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: bold;">Date & Time:</td>
                                        <td style="padding: 8px 0; text-align: right;">${new Date().toLocaleString()}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <p style="margin: 0; color: #92400e;">
                                    <strong>🔒 Security Notice:</strong> If this transaction was not made by you, please contact us immediately.
                                </p>
                            </div>
                            
                            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-bottom: 0;">
                                For your security, we notify you of all ATM transactions.<br>
                                This is an automated email from CBI Bank. Please do not reply.
                            </p>
                        </div>
                    </div>
                `
            });
        } catch (error) {
            console.error("Failed to send ATM transaction email:", error);
        }
    }

    /**
     * Send Fixed Deposit email notifications
     */
    static async sendFDEmail(userName, userEmail, amount, action, maturityDate = null, fdId) {
        try {
            const isOpening = action.toLowerCase() === 'opened';
            const isClaiming = action.toLowerCase() === 'claimed';
            
            let subject = `Fixed Deposit ${action} - ₹${amount.toLocaleString()}`;
            let actionColor = isOpening ? '#059669' : (isClaiming ? '#dc2626' : '#2563eb');
            let bgColor = isOpening ? '#f0fdf4' : (isClaiming ? '#fef2f2' : '#f0f9ff');
            let textColor = isOpening ? '#166534' : (isClaiming ? '#991b1b' : '#1e40af');
            
            await NodeMailerService.sendEmail({
                to: userEmail,
                subject: subject,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2563eb; margin: 0;">CBI Bank</h1>
                                <h2 style="color: ${actionColor}; margin: 10px 0;">Fixed Deposit ${action} 🏦</h2>
                            </div>
                            
                            <div style="background-color: ${bgColor}; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: ${textColor}; margin-top: 0;">FD Details</h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Amount:</td>
                                        <td style="padding: 8px 0; text-align: right; color: ${actionColor}; font-size: 18px; font-weight: bold;">₹${amount.toLocaleString()}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Action:</td>
                                        <td style="padding: 8px 0; text-align: right;">${action}</td>
                                    </tr>
                                    ${maturityDate ? `
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Maturity Date:</td>
                                        <td style="padding: 8px 0; text-align: right;">${maturityDate}</td>
                                    </tr>
                                    ` : ''}
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">FD ID:</td>
                                        <td style="padding: 8px 0; text-align: right; font-family: monospace;">${fdId}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: bold;">Date & Time:</td>
                                        <td style="padding: 8px 0; text-align: right;">${new Date().toLocaleString()}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            ${isOpening ? `
                            <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <p style="margin: 0; color: #1e40af;">
                                    <strong>📈 Congratulations:</strong> Your Fixed Deposit has been successfully opened. You will earn attractive interest on your investment.
                                </p>
                            </div>
                            ` : ''}
                            
                            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-bottom: 0;">
                                Thank you for choosing CBI Bank for your investments.<br>
                                This is an automated email from CBI Bank. Please do not reply.
                            </p>
                        </div>
                    </div>
                `
            });
        } catch (error) {
            console.error("Failed to send FD email:", error);
        }
    }

    /**
     * Send account opening confirmation email
     */
    static async sendAccountOpeningEmail(userName, userEmail, accountNumber, accountType) {
        try {
            await NodeMailerService.sendEmail({
                to: userEmail,
                subject: "Welcome to CBI Bank - Account Opened Successfully!",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #2563eb; margin: 0;">Welcome to CBI Bank! 🎉</h1>
                                <h2 style="color: #059669; margin: 10px 0;">Account Successfully Opened</h2>
                            </div>
                            
                            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                                <h3 style="color: #166534; margin-top: 0;">Your Account Details</h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Account Holder:</td>
                                        <td style="padding: 8px 0; text-align: right;">${userName}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Account Number:</td>
                                        <td style="padding: 8px 0; text-align: right; font-family: monospace; color: #059669; font-weight: bold;">${accountNumber}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">Account Type:</td>
                                        <td style="padding: 8px 0; text-align: right;">${accountType}</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #e5e7eb;">
                                        <td style="padding: 8px 0; font-weight: bold;">IFSC Code:</td>
                                        <td style="padding: 8px 0; text-align: right; font-family: monospace;">CBIN001234</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; font-weight: bold;">Opening Date:</td>
                                        <td style="padding: 8px 0; text-align: right;">${new Date().toLocaleDateString()}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <p style="margin: 0; color: #92400e;">
                                    <strong>🔐 Next Steps:</strong> Please complete your KYC verification to unlock all banking features including transfers, cards, and loans.
                                </p>
                            </div>
                            
                            <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <p style="margin: 0; color: #1e40af;">
                                    <strong>🎁 Special Offer:</strong> Enjoy zero balance requirement for the first 6 months!
                                </p>
                            </div>
                            
                            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-bottom: 0;">
                                Thank you for choosing CBI Bank. We're excited to serve you!<br>
                                This is an automated email from CBI Bank. Please do not reply.
                            </p>
                        </div>
                    </div>
                `
            });
        } catch (error) {
            console.error("Failed to send account opening email:", error);
        }
    }

    /**
     * Create announcement/notification for user
     */
    static async createAnnouncement(userId, type, title, message, priority = 'normal') {
        try {
            await AnnouncementModel.create({
                user: userId,
                type: type,
                title: title,
                message: message,
                priority: priority,
                isRead: false
            });
        } catch (error) {
            console.error("Failed to create announcement:", error);
        }
    }

    /**
     * Get user announcements
     */
    static async getUserAnnouncements(userId, limit = 20) {
        try {
            return await AnnouncementModel.find({ user: userId })
                .sort({ createdAt: -1 })
                .limit(limit);
        } catch (error) {
            console.error("Failed to get user announcements:", error);
            return [];
        }
    }

    /**
     * Mark announcement as read
     */
    static async markAnnouncementAsRead(announcementId, userId) {
        try {
            await AnnouncementModel.findOneAndUpdate(
                { _id: announcementId, user: userId },
                { isRead: true }
            );
        } catch (error) {
            console.error("Failed to mark announcement as read:", error);
        }
    }
}

module.exports = NotificationService;