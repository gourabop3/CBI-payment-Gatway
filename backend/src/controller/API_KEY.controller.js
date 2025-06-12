const APIKEYService = require("../service/APIKEYService")

class APIKEYController{
    static SendEmailOTP = async(req,res)=>{
        const res_obj = await APIKEYService.SendEmailOTP(req.user)
        res.status(200).send(res_obj)
    }
      static VerifyEmailOTP = async(req,res)=>{
        const res_obj = await APIKEYService.VerifyEmailOTP(req.user,req.body)
        res.status(200).send(res_obj)
    }
}

module.exports = APIKEYController