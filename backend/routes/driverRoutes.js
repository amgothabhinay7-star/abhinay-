const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Get nearby drivers
router.get('/nearby', authMiddleware, async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const drivers = await User.find({
      userType: { $in: ['driver', 'both'] },
      isActive: true
    }).select('name profilePicture rating');

    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get driver profile
router.get('/:driverId', authMiddleware, async (req, res) => {
  try {
    const driver = await User.findById(req.params.driverId)
      .select('name profilePicture rating phone');
    
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rate driver
router.post('/:driverId/rate', authMiddleware, async (req, res) => {
  try {
    const { rating } = req.body;

    const driver = await User.findById(req.params.driverId);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    // Update driver rating (simple average)
    const newRating = (driver.rating + rating) / 2;
    driver.rating = newRating;
    await driver.save();

    res.json({ message: 'Rating submitted', newRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
