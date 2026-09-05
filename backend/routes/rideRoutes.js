const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const authMiddleware = require('../middleware/auth');

// Create ride request
router.post('/request', authMiddleware, async (req, res) => {
  try {
    const { pickupLocation, dropLocation, rideType } = req.body;

    const ride = new Ride({
      rider: req.user.id,
      pickupLocation,
      dropLocation,
      rideType,
      fare: calculateFare(rideType), // Implement fare calculation
      status: 'requested'
    });

    await ride.save();
    res.status(201).json({ message: 'Ride requested', ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available rides (for drivers)
router.get('/available', authMiddleware, async (req, res) => {
  try {
    const rides = await Ride.find({ status: 'requested' })
      .populate('rider', 'name rating profilePicture')
      .limit(10);
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Accept ride (driver accepts)
router.put('/:rideId/accept', authMiddleware, async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(
      req.params.rideId,
      { driver: req.user.id, status: 'accepted' },
      { new: true }
    ).populate('rider driver', 'name phone profilePicture rating');

    res.json({ message: 'Ride accepted', ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete ride
router.put('/:rideId/complete', authMiddleware, async (req, res) => {
  try {
    const ride = await Ride.findByIdAndUpdate(
      req.params.rideId,
      { status: 'completed', completedAt: new Date() },
      { new: true }
    );

    res.json({ message: 'Ride completed', ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get ride details
router.get('/:rideId', authMiddleware, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId)
      .populate('rider driver', 'name phone profilePicture rating');
    res.json(ride);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate fare based on ride type
function calculateFare(rideType) {
  const baseFare = 50;
  const multipliers = {
    economy: 1,
    premium: 1.5,
    shared: 0.7,
    xl: 2
  };
  return baseFare * (multipliers[rideType] || 1);
}

module.exports = router;
