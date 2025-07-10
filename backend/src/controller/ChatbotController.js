const ChatbotService = require('../service/ChatbotService');

class ChatbotController {
    static async handleChat(req, res, next) {
        try {
            const { message } = req.body;
            const userId = req.user._id;
            
            if (!message || !message.trim()) {
                return res.status(400).json({ 
                    success: false, 
                    msg: 'Message is required' 
                });
            }

            const response = await ChatbotService.processMessage(message, userId, req.user);
            
            res.status(200).json({
                success: true,
                response: response,
                timestamp: new Date()
            });
        } catch (error) {
            next(error);
        }
    }

    static async getChatHistory(req, res, next) {
        try {
            const userId = req.user._id;
            const { limit = 20 } = req.query;
            
            const history = await ChatbotService.getChatHistory(userId, parseInt(limit));
            
            res.status(200).json({
                success: true,
                history: history
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ChatbotController;