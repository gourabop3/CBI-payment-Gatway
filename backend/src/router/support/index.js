const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../../middleware/AuthMiddleware");
const SupportController = require("../../controller/SupportController");

router.post("/chat", AuthMiddleware, SupportController.chat);

module.exports = router;