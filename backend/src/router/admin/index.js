const express = require('express');
const router = express.Router();
const AdminController = require('../../controller/AdminController');
const AdminAuthMiddleware = require('../../middleware/AdminAuth');

// Admin login
router.post('/login', AdminController.loginAdmin);

// user management
router.post('/user/:id/activation',AdminAuthMiddleware,AdminController.toggleUserActivation);
router.post('/user/:id/update-profile',AdminAuthMiddleware,AdminController.updateUserProfile);

// list users
router.get('/users',AdminAuthMiddleware,AdminController.listUsers);

// get all user transactions
router.get('/transactions',AdminAuthMiddleware,AdminController.getAllTransactions);

// generate and send account statement
router.post('/user/:id/statement',AdminAuthMiddleware,AdminController.generateStatement);

// Example protected route (placeholder for dashboard APIs)
router.get('/stats', AdminAuthMiddleware, (req, res)=>{
    res.send({msg:'Protected admin stats endpoint', userCount:0});
});

module.exports = router;