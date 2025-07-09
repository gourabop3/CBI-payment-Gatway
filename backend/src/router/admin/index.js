const express = require('express');
const router = express.Router();
const AdminController = require('../../controller/AdminController');
const AdminAuthMiddleware = require('../../middleware/AdminAuth');

// Admin login
router.post('/login', AdminController.loginAdmin);

// Example protected route (placeholder for dashboard APIs)
router.get('/stats', AdminAuthMiddleware, (req, res)=>{
    res.send({msg:'Protected admin stats endpoint', userCount:0});
});

module.exports = router;