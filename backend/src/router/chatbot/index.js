const express = require('express');
const router = express.Router();
const ChatbotController = require('../../controller/ChatbotController');
const AuthMiddleware = require('../../middleware/AuthMiddleware');

// Chat endpoint - requires authentication
router.post('/chat', AuthMiddleware, ChatbotController.handleChat);

// Get chat history (optional)
router.get('/history', AuthMiddleware, ChatbotController.getChatHistory);

module.exports = router;