const express = require("express")
const AuthMiddleware = require("../../middleware/AuthMiddleware")
const router = express.Router()
const APIKEYController = require("../../controller/API_KEY.controller")

router.route("/send-email-otp")
.post(AuthMiddleware,APIKEYController.SendEmailOTP)

router.route("/verify-email-otp")
.post(AuthMiddleware,APIKEYController.VerifyEmailOTP)


module.exports = router