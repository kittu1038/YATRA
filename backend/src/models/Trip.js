import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  destinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
  }],
  stays: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stay',
  }],
  startDate: Date,
  endDate: Date,
  totalDays: {
    type: Number,
    default: 1,
  },
  groupSize: {
    type: Number,
    default: 1,
    min: 1,
  },
  budget: {
    target: { type: Number, default: 0 },
    transit: { type: Number, default: 0 },
    stay: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    activities: { type: Number, default: 0 },
    misc: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' },
  },
  route: {
    stops: [{
      name: String,
      slug: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    }],
    mode: {
      type: String,
      enum: ['train', 'bus', 'flight', 'drive'],
      default: 'train',
    },
    totalDistanceKm: { type: Number, default: 0 },
    estimatedCost: { type: Number, default: 0 },
  },
  status: {
    type: String,
    enum: ['planning', 'confirmed', 'in_progress', 'completed', 'archived'],
    default: 'planning',
  },
  itinerary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary',
  },
  packingList: [{
    item: { type: String, required: true },
    isPacked: { type: Boolean, default: false },
    category: { type: String, default: 'General' },
  }],
  notes: {
    type: String,
    default: '',
  },
}, { timestamps: true });

tripSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('Trip', tripSchema);
