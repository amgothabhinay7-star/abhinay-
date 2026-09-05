const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  referee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  referralCode: {
    type: String,
    required: true,
    unique: true
  },
  discountAmount: {
    type: Number,
    default: 100 // Discount in INR
  },
  bonusAmount: {
    type: Number,
    default: 50 // Bonus for referrer
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  usedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 90*24*60*60*1000) // 90 days
  }
});

module.exports = mongoose.model('Referral', referralSchema);
