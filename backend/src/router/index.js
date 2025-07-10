const express = require('express');
const authRoutes = require('./auth');
const amountRoutes = require('./amount');
const transferRoutes = require('./transfer');
const kycRoutes = require('./kyc');
const atmCardRoutes = require('./atm-card');
const fdRoutes = require('./fd');
const apiKeyRoutes = require('./api-keys');
const adminRoutes = require('./admin');

const router = express.Router();

// Route definitions
router.use('/auth', authRoutes);
router.use('/amount', amountRoutes);
router.use('/transfer', transferRoutes);
router.use('/kyc', kycRoutes);
router.use('/atm-card', atmCardRoutes);
router.use('/fd', fdRoutes);
router.use('/api-keys', apiKeyRoutes);
router.use('/admin', adminRoutes);

module.exports = router;