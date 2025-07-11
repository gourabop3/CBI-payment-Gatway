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

            // Check if user email is verified
            if (!userd.isEmailVerifed) {
                throw new ApiError(400, "Please verify your email first to generate API keys")
            }

            const otp = random(100000,999999)
            const token = jwt.sign({userId:userd._id}, api_key_Jwt_secret+otp, {
                expiresIn:'10m'
            })

            // Send verification email 
            await NodeMailerService.SendVerificationEmail(userd.name, otp, userd.email)
            
            return {
                token: token,
                msg: "OTP sent to your registered email address for API key generation"
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

            // Verify OTP and token
            const payload = jwt.verify(token, api_key_Jwt_secret + Number(otp))
            const userId = payload.userId 

            if (!userId || userId !== userd._id.toString()) {
                throw new ApiError(400, "Invalid token or OTP")
            }

            // Check for existing active API key and deactivate it
            const existAPIDoc = await APIKEYModel.findOne({user: userId, isOnWorking: true})
            if(existAPIDoc){
                await APIKEYModel.findByIdAndUpdate(existAPIDoc._id, {
                    isOnWorking: false
                })
            }

            // Generate new API credentials for payment gateway
            const apiSecret = crypto.randomBytes(32).toString('hex') // 64 character secret
            const apiHash = crypto.createHmac('sha256', apiSecret)
                .update(`${userd._id}-${userd.email}-${Date.now()}`)
                .digest('hex');

            // Generate payment gateway compatible keys
            const paymentGatewayKey = `pg_${crypto.randomBytes(16).toString('hex')}`
            const merchantId = `merchant_${crypto.randomBytes(8).toString('hex')}`

            console.log("Generated API credentials for user:", userd._id);
                        
            // Save new API key with payment gateway information
            const newAPIKey = await APIKEYModel.create({
                api_secret: apiSecret,
                api_hash: apiHash,
                payment_gateway_key: paymentGatewayKey,
                merchant_id: merchantId,
                number_of_regenerate: (existAPIDoc?.number_of_regenerate || 0) + 1,
                user: userd._id
            })

            // Update user's API key reference
            await UserModel.findByIdAndUpdate(userd._id, {
                api_key_id: newAPIKey._id
            })

            return {
                msg: "API credentials generated successfully for payment gateway!",
                api_hash: apiHash,
                api_secret: apiSecret,
                payment_gateway_key: paymentGatewayKey,
                merchant_id: merchantId,
                note: "These credentials are for payment gateway integration. Store them securely."
            }
        } catch (error) {
            console.error("Error verifying API key email OTP:", error);
            
            if (error.name === 'JsonWebTokenError') {
                throw new ApiError(400, "Invalid OTP or token")
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

    // New method to get user's active API keys
    static GetUserAPIKeys = async(user) => {
        try {
            const userd = await UserModel.findById(user)
            if(!userd){
                throw new ApiError(404,"User Not Found")
            }

            const apiKey = await APIKEYModel.findOne({user: user, isOnWorking: true})
            
            if (!apiKey) {
                return {
                    msg: "No active API keys found",
                    hasAPIKey: false
                }
            }

            return {
                msg: "API keys retrieved successfully",
                hasAPIKey: true,
                api_hash: apiKey.api_hash,
                api_secret: apiKey.api_secret,
                payment_gateway_key: apiKey.payment_gateway_key,
                merchant_id: apiKey.merchant_id,
                created_at: apiKey.createdAt,
                regenerated_count: apiKey.number_of_regenerate
            }
        } catch (error) {
            console.error("Error retrieving API keys:", error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(500, "Failed to retrieve API keys")
        }
    }

}
module.exports = APIKEYService