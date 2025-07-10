const nodemailer = require("nodemailer");

// Required environment variables for SMTP configuration
const requiredEnvVars = [
    "EMAIL_SMTP_HOST",
    "EMAIL_SMTP_PORT", 
    "EMAIL_SMTP_USERNAME",
    "EMAIL_SMTP_PASSWORD",
    "EMAIL_SMTP_FROM",
];

// Check if all required environment variables are set
const hasIncompleteConfig = requiredEnvVars.some(envVar => !process.env[envVar]);

if (hasIncompleteConfig) {
    if (process.env.NODE_ENV === 'development') {
        console.log('⚠️  SMTP configuration incomplete - email features disabled in development mode');
        // Create a mock transporter for development
        var transporter = {
            sendMail: async (options) => {
                console.log('📧 Mock email sent:', {
                    to: options.to,
                    subject: options.subject,
                    from: options.from
                });
                return { messageId: 'mock-' + Date.now() };
            }
        };
    } else {
        throw new Error("SMTP configuration incomplete – see backend/src/utils/NodeMail.js");
    }
} else {
    const smtpPort = Number(process.env.EMAIL_SMTP_PORT);

    // Check if secure connection should be used (typically true for port 465, false for 587)
    const useSecure = process.env.EMAIL_SMTP_SECURE 
        ? process.env.EMAIL_SMTP_SECURE === "true" 
        : smtpPort === 465;

    var transporter = nodemailer.createTransporter({
        host: process.env.EMAIL_SMTP_HOST,
        port: smtpPort,
        secure: useSecure,
        auth: {
            user: process.env.EMAIL_SMTP_USERNAME,
            pass: process.env.EMAIL_SMTP_PASSWORD,
        },
    });
}

class NodeMailerService{
    static SendVerificationEmail = async(user,otp,email)=>{
        try {
            console.log("Sending verification email to:", email);
            
            const info = await transporter.sendMail({
                from: '"CBI BANK" '+process.env.EMAIL_SMTP_FROM,
                to: email,
                subject: "Verification Email - CBI Bank",
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h2 style="color: #2563eb; text-align: center;">Email Verification</h2>
                        <p>Dear ${user},</p>
                        <p>Thank you for using CBI Bank services. Please use the following OTP to verify your email address:</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <span style="font-size: 32px; font-weight: bold; color: #2563eb; background-color: #f0f9ff; padding: 15px 30px; border-radius: 10px; letter-spacing: 5px;">${otp}</span>
                        </div>
                        <p style="color: #6b7280; font-size: 14px;">This OTP is valid for 10 minutes only.</p>
                        <p>If you didn't request this verification, please ignore this email.</p>
                        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                        <p style="color: #6b7280; font-size: 12px; text-align: center;">
                            This is an automated email from CBI Bank. Please do not reply to this email.
                        </p>
                    </div>
                </div>
                `
            });
            
            console.log("Verification email sent successfully");
            return info;
        } catch (error) {
            console.error("Error sending verification email:", error);
            throw new Error("Failed to send verification email");
        }
    }

    static SendDepositEmail = async(name,email,amount,accountNumber)=>{
        try {
            const info = await transporter.sendMail({
                from: '"CBI BANK" '+process.env.EMAIL_SMTP_FROM,
                to: email,
                subject: `Deposit Confirmation - ₹${amount} Added to Your Account`,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h2 style="color: #059669; text-align: center;">Deposit Successful! 💰</h2>
                        <p>Dear ${name},</p>
                        <p>Your deposit of <strong style="color: #059669;">₹${amount}</strong> has been successfully added to your account ending with <strong>${accountNumber}</strong>.</p>
                        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
                            <p style="margin: 0; color: #166534;"><strong>Amount Deposited:</strong> ₹${amount}</p>
                            <p style="margin: 10px 0 0 0; color: #166534;"><strong>Transaction Date:</strong> ${new Date().toLocaleString()}</p>
                        </div>
                        <p>Thank you for banking with us!</p>
                        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                        <p style="color:#6b7280; font-size:12px; text-align:center;">This is an automated email from CBI Bank. Please do not reply.</p>
                    </div>
                </div>
                `
            });
            console.log('Deposit confirmation email sent to',email);
            return info;
        } catch (err) {
            console.error('Failed sending deposit email',err);
            throw err;
        }
    }

    /**
     * Generic method to send any type of email
     */
    static sendEmail = async(emailOptions) => {
        try {
            const { to, subject, html, text } = emailOptions;
            
            const mailOptions = {
                from: '"CBI BANK" ' + process.env.EMAIL_SMTP_FROM,
                to: to,
                subject: subject,
                html: html,
                text: text
            };

            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent successfully to ${to}: ${subject}`);
            return info;
        } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Failed to send email: " + error.message);
        }
    }
}

module.exports = NodeMailerService