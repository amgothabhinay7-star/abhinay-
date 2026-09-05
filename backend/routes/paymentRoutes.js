const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const authMiddleware = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process payment
router.post('/process', authMiddleware, async (req, res) => {
  try {
    const { rideId, amount, paymentMethod, stripeToken } = req.body;

    let transactionId = null;

    // If payment method is card, process via Stripe
    if (paymentMethod === 'card' && stripeToken) {
      const charge = await stripe.charges.create({
        amount: amount * 100, // Convert to paise
        currency: 'inr',
        source: stripeToken,
        description: `Payment for Ride ${rideId}`
      });

      transactionId = charge.id;
    }

    // Calculate commission (15%)
    const commissionAmount = amount * 0.15;
    const insurancePremium = 5; // Fixed insurance premium

    const payment = new Payment({
      ride: rideId,
      user: req.user.id,
      amount,
      paymentMethod,
      transactionId,
      status: paymentMethod === 'cash' ? 'pending' : 'success',
      commissionAmount,
      insurancePremium
    });

    await payment.save();

    res.status(201).json({
      message: 'Payment processed successfully',
      payment,
      breakdown: {
        fare: amount,
        commission: commissionAmount,
        insurance: insurancePremium,
        total: amount + insurancePremium
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get payment history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .populate('ride', 'status fare pickupLocation dropLocation');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
