const express = require('express');
const UPIController = require('../../controller/UPIController');
const UPIValidation = require('../../validations/UPIValidation');
const ValidationMiddleware = require('../../middleware/ValidationMiddleware');
const router = express.Router();

// UPI Profile & Setup
router.get('/profile', UPIController.getUPIProfile);
router.post('/create-upi-id', UPIValidation.createUPIId, ValidationMiddleware, UPIController.createUPIId);
router.post('/verify-pin', UPIValidation.verifyUPIPin, ValidationMiddleware, UPIController.verifyUPIPin);
router.post('/change-pin', UPIValidation.changeUPIPin, ValidationMiddleware, UPIController.changeUPIPin);

// UPI Payments
router.post('/pay', UPIValidation.processPayment, ValidationMiddleware, UPIController.processPayment);
router.get('/qr', UPIValidation.generateQR, ValidationMiddleware, UPIController.generateQR);

// UPI Search & Discovery
router.get('/search', UPIValidation.searchUPIId, ValidationMiddleware, UPIController.searchUPIId);

// UPI Transactions & History
router.get('/transactions', UPIValidation.getTransactions, ValidationMiddleware, UPIController.getTransactions);
router.get('/stats', UPIController.getUPIStats);

module.exports = router;