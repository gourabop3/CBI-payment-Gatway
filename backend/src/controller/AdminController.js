const AdminService = require('../service/AdminService');

class AdminController {
    static async loginAdmin(req, res, next) {
        try {
            const resObj = await AdminService.loginAdmin(req.body);
            res.status(200).send(resObj);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AdminController;