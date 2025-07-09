const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/User.model');
const { ProfileModel } = require('../models/Profile.model');

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
        await UserModel.findByIdAndUpdate(userId,{
            name:body.name,
            email:body.email
        });
        await ProfileModel.findOneAndUpdate({user:userId},{
            mobile_no:body.mobile_no,
            bio:body.bio,
            lastProfileUpdate:new Date()
        })
        return {msg:'Profile updated by admin'}
    }

    static async listUsers(){
        const users = await UserModel.find().select('name email isActive createdAt');
        return users;
    }
}

module.exports = AdminService;