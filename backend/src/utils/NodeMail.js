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
    
    await transporter.sendMail({
          from: '"CBI BANK" '+process.env.EMAIL_SMTP_FROM,
          to: email,
          subject: "Vefication Email ", 
          html: `
              Hi, <strong>${user}</strong>, <br/>
              your OTP is : <mark><strong>${otp}</strong></mark>
          `, // HTML body
        });
  }

}

module.exports =NodeMailerService