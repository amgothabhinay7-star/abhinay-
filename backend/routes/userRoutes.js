const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, profilePicture } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, profilePicture },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's ride history
router.get('/rides-history', authMiddleware, async (req, res) => {
  try {
    const Ride = require('../models/Ride');
    const rides = await Ride.find({
      $or: [{ rider: req.user.id }, { driver: req.user.id }]
    }).populate('rider driver', 'name rating profilePicture');

    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add money to wallet
router.post('/add-wallet', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { wallet: amount } },
      { new: true }
    );

    res.json({ message: 'Amount added to wallet', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
