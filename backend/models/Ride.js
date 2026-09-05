const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  pickupLocation: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: String
  },
  dropLocation: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  rideType: {
    type: String,
    enum: ['economy', 'premium', 'shared', 'xl'],
    default: 'economy'
  },
  fare: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'ongoing', 'completed', 'cancelled'],
    default: 'requested'
  },
  paymentMethod: {
    type: String,
    enum: ['wallet', 'card', 'cash'],
    default: 'wallet'
  },
  insuranceCovered: {
    type: Boolean,
    default: true
  },
  insuranceAmount: {
    type: Number,
    default: 200000 // 2 Lakh
  },
  riderRating: Number,
  driverRating: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

// Index for geospatial queries
rideSchema.index({ 'pickupLocation.coordinates': '2dsphere' });
rideSchema.index({ 'dropLocation.coordinates': '2dsphere' });

module.exports = mongoose.model('Ride', rideSchema);
