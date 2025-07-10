const { KYCApplicationModel } = require('../models/KYCApplication.model');
const { ProfileModel } = require('../models/Profile.model');
const { UserModel } = require('../models/User.model');
const NotificationService = require('../service/NotificationService');
const ApiError = require('../utils/ApiError');

class KYCService {
  // User applies for KYC
  static async applyForKYC(userId, body) {
    const { aadhaarNumber, panNumber, aadhaarImage, panImage } = body;

    // check existing pending
    const existPending = await KYCApplicationModel.findOne({ user: userId, status: 'pending' });
    if (existPending) {
      throw new ApiError(400, 'You already have a pending KYC application');
    }

    // create application
    const app = await KYCApplicationModel.create({
      user: userId,
      aadhaarNumber,
      panNumber,
      documents: {
        aadhaarImage,
        panImage,
      },
    });

    // update profile status
    await ProfileModel.findOneAndUpdate({ user: userId }, { kyc_status: 'pending' });

    return { msg: 'KYC application submitted', applicationId: app._id };
  }

  // user fetch status
  static async getStatus(userId) {
    const app = await KYCApplicationModel.findOne({ user: userId }).sort({ createdAt: -1 });
    return app;
  }

  // Admin list pending
  static async listPending() {
    const list = await KYCApplicationModel.find({ status: 'pending' })
      .populate('user', 'name email');
    return list;
  }

  // Approve
  static async approve(id) {
    const app = await KYCApplicationModel.findById(id);
    if (!app) throw new ApiError(404, 'Application not found');
    if (app.status !== 'pending') throw new ApiError(400, 'Application already processed');
    app.status = 'approved';
    await app.save();

    await ProfileModel.findOneAndUpdate({ user: app.user }, { kyc_status: 'verified' });

    // Activate user account and send activation email
    const user = await UserModel.findById(app.user);
    if (user) {
      user.isActive = true;
      await user.save();
      await NotificationService.sendAccountActivationEmail(user.email, user.name);
    }

    return { msg: 'KYC approved' };
  }

  // Reject
  static async reject(id, reason = '') {
    const app = await KYCApplicationModel.findById(id);
    if (!app) throw new ApiError(404, 'Application not found');
    if (app.status !== 'pending') throw new ApiError(400, 'Application already processed');
    app.status = 'rejected';
    app.reason = reason;
    await app.save();

    await ProfileModel.findOneAndUpdate({ user: app.user }, { kyc_status: 'rejected' });

    return { msg: 'KYC rejected' };
  }
}

module.exports = KYCService;