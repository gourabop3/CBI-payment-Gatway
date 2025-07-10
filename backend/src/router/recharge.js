const express = require('express');
const RechargeController = require('../controller/RechargeController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

// Mobile recharge
router.post('/mobile', AuthMiddleware, RechargeController.mobileRecharge);

// Bill payment
router.post('/bill-payment', AuthMiddleware, RechargeController.billPayment);

// Get recharge history
router.get('/history', AuthMiddleware, RechargeController.getRechargeHistory);

// Get operator details
router.get('/operators', AuthMiddleware, RechargeController.getOperators);

// Suggestions (public, no auth required)
router.get('/suggestions', RechargeController.getSuggestions);

module.exports = router;