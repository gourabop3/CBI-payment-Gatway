const { UserModel } = require("../models/User.model")
const ApiError = require("../utils/ApiError")
const {default:random} = require("random-int")
const jwt = require("jsonwebtoken")
const NodeMailerService = require("../utils/NodeMail")
const { APIKEYModel } = require("../models/api_key.model")
const crypto = require("crypto")

const api_key_Jwt_screate = process.env.EMAIL_VERIFIED_HASH_API || "!@&*@#$%^&*#$%^&*"

class APIKEYService{


    static SendEmailOTP = async(user)=>{
        const userd = await UserModel.findById(user)
        if(!userd){
            throw new ApiError(404,"User Not Found")
        }
        const otp = random(100000,999999)
      const token =  jwt.sign({userId:userd._id},api_key_Jwt_screate+otp,{
            expiresIn:'10m'
        })

        // email send 
       await NodeMailerService.SendVerificationEmail(userd.name,otp,userd.email)
       return {
        token:token,
        msg:"Verification Email Send On Your Register Email Address "
       }

    }

    static VerifyEmailOTP = async(user,{otp,token})=>{
        const userd = await UserModel.findById(user)
        if(!userd){
            throw new ApiError(404,"User Not Found")
        }
       
            try {
                 const payload = jwt.verify(token,api_key_Jwt_screate+Number(otp))
                const data = payload.userId 
              

                // already exist
                const existAPIDoc = await APIKEYModel.findOne({user:data,isOnWorking:true})
                if(existAPIDoc){
                     await APIKEYModel.findByIdAndUpdate(existAPIDoc._id,{
                        isOnWorking:false
                     })
                  
                }

                

                // generate api key

                // generate random bytes using crypto 
                const secret  = crypto.randomBytes(16).toString('hex')
 
            const hash = crypto.createHmac('sha256', secret)
            .update(`${userd._id}`)
            .digest('hex');
            console.log(hash);
                        
                // generate api screate
                // generate api no of regenerate

                await APIKEYModel.create({
                    api_secret:secret,
                    api_hash:hash,
                    number_of_regenerate:existAPIDoc?.number_of_regenerate+1 ||  0,
                    user:userd._id

                })



                return {
                   msg:"Credentials Created :)",
                   hash,
                   secret

                }
            } catch (error) {
               
                throw new ApiError(400,"OTP Not Valid")
            }
 

    }

}
module.exports =APIKEYService