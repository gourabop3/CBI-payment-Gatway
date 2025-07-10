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

    static async toggleUserActivation(req,res,next){
        try{
            const {id} = req.params;
            const {state} = req.body; // true/false
            const resObj = await AdminService.toggleUserActivation(id,state);
            res.status(200).send(resObj);
        }catch(err){
            next(err);
        }
    }

    static async updateUserProfile(req,res,next){
        try{
            const {id} = req.params;
            const resObj = await AdminService.updateUserProfile(id,req.body);
            res.status(200).send(resObj);
        }catch(err){
            next(err);
        }
    }

    static async listUsers(req,res,next){
        try{
            const data = await AdminService.listUsers();
            res.status(200).send(data);
        }catch(err){
            next(err);
        }
    }

    static async getAllTransactions(req,res,next){
        try{
            const { page = 1, limit = 50, userId, type, startDate, endDate } = req.query;
            const data = await AdminService.getAllTransactions({
                page: parseInt(page),
                limit: parseInt(limit),
                userId,
                type,
                startDate,
                endDate
            });
            res.status(200).send(data);
        }catch(err){
            next(err);
        }
    }

    static async generateStatement(req,res,next){
        try{
            const {id} = req.params;
            const { startDate, endDate, sendEmail = true } = req.body;
            const data = await AdminService.generateStatement(id, {
                startDate,
                endDate,
                sendEmail
            });
            res.status(200).send(data);
        }catch(err){
            next(err);
        }
    }
}

module.exports = AdminController;