const express = require("express")
const AuthMiddleware = require("../../middleware/AuthMiddleware")
const APIKEYController = require("../../controller/API_KEY.controller")

const router = express.Router()

router.route('/send-email-otp')
.post(AuthMiddleware,APIKEYController.SendEmailOTP)

router.route('/verify-email-otp')
.post(AuthMiddleware,APIKEYController.VerifyEmailOTP)

router.route('/get-keys')
.get(AuthMiddleware,APIKEYController.GetAPIKeys)

module.exports = router