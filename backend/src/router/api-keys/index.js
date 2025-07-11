const express = require("express")
const AuthMiddleware = require("../../middleware/AuthMiddleware")
const APIKEYController = require("../../controller/API_KEY.controller")

const router = express.Router()

// Existing routes
router.route('/send-email-otp')
.post(AuthMiddleware,APIKEYController.SendEmailOTP)

router.route('/verify-email-otp')
.post(AuthMiddleware,APIKEYController.VerifyEmailOTP)

router.route('/get-keys')
.get(AuthMiddleware,APIKEYController.GetAPIKeys)

// New professional API endpoints
router.route('/webhook/config')
.put(AuthMiddleware,APIKEYController.UpdateWebhookConfig)

router.route('/environment/switch')
.put(AuthMiddleware,APIKEYController.SwitchEnvironment)

router.route('/rate-limits/update')
.put(AuthMiddleware,APIKEYController.UpdateRateLimits)

router.route('/usage/record')
.post(APIKEYController.RecordAPIUsage) // No auth middleware for usage tracking

module.exports = router