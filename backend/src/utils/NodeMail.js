const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host:process.env.EMAIL_SMTP_HOST,
  port: process.env.EMAIL_SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SMTP_USERNAME,
    pass: process.env.EMAIL_SMTP_PASSWORD,
  },
});


class NodeMailerService{
  static SendVerificationEmail = async(user,otp,email)=>{
    try {
      console.log("Sending verification email to:", email);
      
      await transporter.sendMail({
            from: '"CBI BANK" '+process.env.EMAIL_SMTP_FROM,
            to: email,
            subject: "Verification Email - CBI Bank", 
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #2563eb; text-align: center;">Email Verification</h2>
                    <p>Hi <strong>${user}</strong>,</p>
                    <p>Thank you for using CBI Bank services. Please use the following OTP to verify your email address:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <span style="background-color: #fef3c7; color: #92400e; padding: 10px 20px; font-size: 24px; font-weight: bold; border-radius: 8px; border: 2px solid #f59e0b;">
                            ${otp}
                        </span>
                    </div>
                    <p style="color: #dc2626; font-weight: bold;">⚠️ This OTP will expire in 10 minutes.</p>
                    <p>If you didn't request this verification, please ignore this email.</p>
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; font-size: 12px; text-align: center;">
                        This is an automated email from CBI Bank. Please do not reply to this email.
                    </p>
                </div>
            `, // HTML body
          });
          
      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw new Error("Failed to send verification email");
    }
  }

}

module.exports =NodeMailerService