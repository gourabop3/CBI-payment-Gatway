const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ['percent', 'flat'],
      default: 'percent',
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    minAmount: {
      type: Number,
      default: 0,
    },
    validFrom: {
      type: Date,
      default: Date.now,
    },
    validTo: {
      type: Date,
      required: true,
    },
    usageLimit: {
      type: Number,
      default: 1000,
    },
    used: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      default: 'admin',
    },
  },
  { timestamps: true }
);

DiscountSchema.index({ code: 1 });

module.exports.DiscountModel = mongoose.model('discount', DiscountSchema);