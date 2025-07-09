const { UserModel } = require("../models/User.model")
const ApiError = require("../utils/ApiError")
const {default:random} = require("random-int")
const jwt = require("jsonwebtoken")
const NodeMailerService = require("../utils/NodeMail")
const { APIKEYModel } = require("../models/api_key.model")
const crypto = require("crypto")

const api_key_Jwt_secret = process.env.EMAIL_VERIFIED_HASH_API || "!@&*@#$%^&*#$%^&*"

class APIKEYService{

    static SendEmailOTP = async(user)=>{
        try {
            const userd = await UserModel.findById(user)
            if(!userd){
                throw new ApiError(404,"User Not Found")
            }

            const otp = random(100000,999999)
            const token = jwt.sign({userId:userd._id}, api_key_Jwt_secret+otp, {
                expiresIn:'10m'
            })

            // Send verification email 
            await NodeMailerService.SendVerificationEmail(userd.name, otp, userd.email)
            
            return {
                token: token,
                msg: "Verification email sent to your registered email address"
            }
        } catch (error) {
            console.error("Error sending API key verification email:", error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, "Failed to send verification email")
        }
    }

    static VerifyEmailOTP = async(user, {otp, token})=>{
        try {
            const userd = await UserModel.findById(user)
            if(!userd){
                throw new ApiError(404,"User Not Found")
            }

            if (!otp || !token) {
                throw new ApiError(400, "OTP and token are required")
            }

            const payload = jwt.verify(token, api_key_Jwt_secret + Number(otp))
            const userId = payload.userId 

            if (!userId) {
                throw new ApiError(400, "Invalid token")
            }

            // Check for existing active API key
            const existAPIDoc = await APIKEYModel.findOne({user: userId, isOnWorking: true})
            if(existAPIDoc){
                await APIKEYModel.findByIdAndUpdate(existAPIDoc._id, {
                    isOnWorking: false
                })
            }

            // Generate new API credentials
            const secret = crypto.randomBytes(32).toString('hex') // Increased to 32 bytes for better security
            const hash = crypto.createHmac('sha256', secret)
                .update(`${userd._id}-${Date.now()}`) // Added timestamp for uniqueness
                .digest('hex');

            console.log("Generated API credentials for user:", userd._id);
                        
            // Save new API key
            await APIKEYModel.create({
                api_secret: secret,
                api_hash: hash,
                number_of_regenerate: existAPIDoc?.number_of_regenerate + 1 || 0,
                user: userd._id
            })

            return {
                msg: "API credentials generated successfully!",
                hash,
                secret,
                note: "Please save these credentials securely. They won't be shown again."
            }
        } catch (error) {
            console.error("Error verifying API key email OTP:", error);
            
            if (error.name === 'JsonWebTokenError') {
                throw new ApiError(400, "Invalid or expired OTP")
            }
            if (error.name === 'TokenExpiredError') {
                throw new ApiError(400, "OTP has expired. Please request a new one")
            }
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, "API key generation failed")
        }
    }

}
module.exports = APIKEYService