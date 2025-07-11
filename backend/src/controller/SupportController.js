const SupportService = require("../service/SupportService");

class SupportController {
  static async chat(req, res, next) {
    try {
      const { message } = req.body;
      const data = await SupportService.chat(message);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SupportController;