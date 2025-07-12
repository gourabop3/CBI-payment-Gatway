const express = require('express');
const UPIController = require('../../controller/UPIController');
const router = express.Router();

// Assume authentication middleware sets req.user (already used by other routes)

// QR Code Generation
router.get('/qr', UPIController.generateQR);
router.post('/qr/payment', UPIController.generatePaymentQR);

// Register new UPI handle
router.post('/register', UPIController.registerUPI);

// Payment Processing
router.post('/pay', UPIController.processPayment);

// Transaction Management
router.get('/transactions', UPIController.getTransactions);

// UPI Validation
router.get('/validate/:upi_id', UPIController.validateUPI);

// UPI Limits and Info
router.get('/limits', UPIController.getLimits);
router.get('/info', UPIController.getUserUPIInfo);

module.exports = router;