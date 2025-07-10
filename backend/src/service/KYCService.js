const { KYCApplicationModel } = require('../models/KYCApplication.model');
const { ProfileModel } = require('../models/Profile.model');
const { ApiError } = require('../utils/ApiError');

class KYCService {
  // User applies for KYC
  static async applyForKYC(userId, body) {
    const { 
      fullName, 
      mobileNumber, 
      address, 
      city, 
      state, 
      pincode, 
      aadhaarNumber, 
      panNumber, 
      aadhaarImage, 
      panImage 
    } = body;

    // Check if user already has a pending application
    const existPending = await KYCApplicationModel.findOne({ user: userId, status: 'pending' });
    if (existPending) {
      throw new ApiError(400, 'You already have a pending KYC application');
    }

    // Create KYC application with all fields
    const app = await KYCApplicationModel.create({
      user: userId,
      fullName: fullName.trim(),
      mobileNumber,
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode,
      aadhaarNumber,
      panNumber: panNumber.toUpperCase(),
      documents: {
        aadhaarImage,
        panImage,
      },
    });

    // Update user profile status to pending
    await ProfileModel.findOneAndUpdate({ user: userId }, { kyc_status: 'pending' });

    return { msg: 'KYC application submitted successfully', applicationId: app._id };
  }

  static async getStatus(userId) {
    const app = await KYCApplicationModel.findOne({ user: userId }).sort({ createdAt: -1 });
    if (!app) throw new ApiError(404, 'No KYC application found');
    return app;
  }

  static async listPending() {
    const list = await KYCApplicationModel.find({ status: 'pending' })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    return list;
  }

  static async approve(id) {
    const app = await KYCApplicationModel.findById(id);
    if (!app) throw new ApiError(404, 'Application not found');

    app.status = 'approved';
    await app.save();
    await ProfileModel.findOneAndUpdate({ user: app.user }, { kyc_status: 'verified' });

    return { msg: 'KYC approved successfully' };
  }

  static async reject(id, reason) {
    const app = await KYCApplicationModel.findById(id);
    if (!app) throw new ApiError(404, 'Application not found');

    app.status = 'rejected';
    app.reason = reason || 'Documents verification failed';
    await app.save();

    await ProfileModel.findOneAndUpdate({ user: app.user }, { kyc_status: 'rejected' });

    return { msg: 'KYC rejected', reason: app.reason };
  }
}

module.exports = KYCService;