const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Referral = require('../models/Referral');
const authMiddleware = require('../middleware/auth');
const crypto = require('crypto');

// Get referral code
router.get('/my-code', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ referralCode: user.referralCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Use referral code
router.post('/use-code', authMiddleware, async (req, res) => {
  try {
    const { referralCode } = req.body;
    
    // Find referrer
    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      return res.status(400).json({ error: 'Invalid referral code' });
    }

    // Create referral record
    const referral = new Referral({
      referrer: referrer._id,
      referee: req.user.id,
      referralCode,
      isUsed: true,
      usedAt: new Date()
    });

    await referral.save();

    // Add discount to referee's wallet
    await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { wallet: 100 }, referredBy: referrer._id }
    );

    // Add bonus to referrer's wallet
    await User.findByIdAndUpdate(
      referrer._id,
      { $inc: { wallet: 50 } }
    );

    res.json({ 
      message: 'Referral applied successfully',
      discountAmount: 100,
      bonusAmount: 50
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get referral statistics
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const referrals = await Referral.find({ referrer: req.user.id });
    const successfulReferrals = referrals.filter(r => r.isUsed).length;
    const totalBonus = successfulReferrals * 50;

    res.json({
      totalReferrals: referrals.length,
      successfulReferrals,
      totalBonus
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
