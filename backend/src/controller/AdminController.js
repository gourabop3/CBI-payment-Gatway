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

    /* -------------------- Transactions -------------------- */
    static async listTransactions(req,res,next){
        try{
            const data = await AdminService.listTransactions(req.query);
            res.status(200).send(data);
        }catch(err){
            next(err);
        }
    }

    /* -------------------- Discounts -------------------- */
    static async createDiscount(req,res,next){
        try{
            const disc = await AdminService.createOrUpdateDiscount(req.body);
            res.status(200).send(disc);
        }catch(err){
            next(err);
        }
    }

    static async listDiscounts(req,res,next){
        try{
            const data = await AdminService.listDiscounts();
            res.status(200).send(data);
        }catch(err){
            next(err);
        }
    }

    /* -------------------- Plans -------------------- */
    static async createRechargePlan(req,res,next){
        try{
            const plan = await AdminService.createOrUpdatePlan(req.body);
            res.status(200).send(plan);
        }catch(err){
            next(err);
        }
    }

    static async listRechargePlans(req,res,next){
        try{
            const data = await AdminService.listRechargePlans(req.query);
            res.status(200).send(data);
        }catch(err){
            next(err);
        }
    }
}

module.exports = AdminController;