const express = require('express');
const UPIController = require('../../controller/UPIController');
const router = express.Router();

// Assume authentication middleware sets req.user (already used by other routes)
router.get('/qr', UPIController.generateQR);

module.exports = router;