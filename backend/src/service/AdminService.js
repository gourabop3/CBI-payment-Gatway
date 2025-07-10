const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/User.model');
const { ProfileModel } = require('../models/Profile.model');
const { TransactionModel } = require('../models/Transactions.model');
const { DiscountModel } = require('../models/Discount.model');
const { RechargePlanModel } = require('../models/RechargePlan.model');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || '@@adminjwt';

class AdminService {
    static async loginAdmin(body) {
        const { email, password } = body;
        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            throw new ApiError(401, 'Invalid admin credentials');
        }
        const token = jwt.sign({ isAdmin: true }, ADMIN_JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });
        return { msg: 'Admin login success', token };
    }

    static async toggleUserActivation(userId, state){
        await UserModel.findByIdAndUpdate(userId,{ isActive: state});
        return {msg: `User account has been ${state? 'activated':'deactivated'}`}
    }

    static async updateUserProfile(userId, body){
        await UserModel.findByIdAndUpdate(
            userId,
            {
                name: body.name,
                email: body.email
            },
            { new: true, runValidators: true }
        );

        await ProfileModel.findOneAndUpdate(
            { user: userId },
            {
                mobile_no: body.mobile_no,
                bio: body.bio,
                lastProfileUpdate: new Date()
            },
            { new: true }
        );
        return {msg:'Profile updated by admin'}
    }

    static async listUsers(){
        const users = await UserModel.find().select('name email isActive createdAt');
        return users;
    }

    /* -------------------- Transactions -------------------- */
    static async listTransactions(query={}){
        const { page=1, limit=50, user } = query;
        const q = user ? { user } : {};
        const data = await TransactionModel.find(q)
            .sort({ createdAt: -1 })
            .skip((page-1)*limit)
            .limit(parseInt(limit))
            .populate('user','name email');
        const total = await TransactionModel.countDocuments(q);
        return { total, page:parseInt(page), limit:parseInt(limit), data };
    }

    /* -------------------- Discounts -------------------- */
    static async createOrUpdateDiscount(body){
        const { code } = body;
        if(!code) throw new ApiError(400,'Code is required');
        const disc = await DiscountModel.findOneAndUpdate(
            { code: code.toUpperCase() },
            body,
            { new:true, upsert:true, runValidators:true }
        );
        return { msg:'Discount saved', discount: disc };
    }

    static async listDiscounts(){
        const data = await DiscountModel.find().sort({ createdAt:-1 });
        return data;
    }

    /* -------------------- Recharge Plans -------------------- */
    static async createOrUpdatePlan(body){
        const { operator, amount } = body;
        if(!operator || !amount) throw new ApiError(400,'operator and amount are required');
        const plan = await RechargePlanModel.findOneAndUpdate(
            { operator, amount },
            body,
            { new:true, upsert:true, runValidators:true }
        );
        return { msg:'Plan saved', plan };
    }

    static async listRechargePlans(filter={}){
        const { operator } = filter;
        const q = operator? { operator } : {};
        const data = await RechargePlanModel.find(q).sort({ amount:1 });
        return data;
    }
}

module.exports = AdminService;