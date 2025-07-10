const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // Personal Information
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid mobile number'],
  },
  // Address Information
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode'],
  },
  // Identity Documents
  aadhaarNumber: {
    type: String,
    required: true,
    match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhaar number'],
  },
  panNumber: {
    type: String,
    required: true,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN number'],
  },
  documents: {
    aadhaarImage: {
      type: String, // Base64 encoded image or URL
      required: true,
    },
    panImage: {
      type: String, // Base64 encoded image or URL
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  reason: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const KYCApplicationModel = mongoose.model('kyc_application', kycSchema);

exports.KYCApplicationModel = KYCApplicationModel;