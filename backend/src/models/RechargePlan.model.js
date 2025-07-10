const mongoose = require('mongoose');

const RechargePlanSchema = new mongoose.Schema(
  {
    operator: {
      type: String,
      required: true,
      index: true,
      enum: ['jio', 'airtel', 'vi', 'bsnl', 'mtnl', 'reliance', 'tata', 'telenor'],
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    validity: {
      type: String,
    },
    data: {
      type: String,
    },
    talktime: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

RechargePlanSchema.index({ operator: 1, amount: 1 });

module.exports.RechargePlanModel = mongoose.model('recharge_plan', RechargePlanSchema);