import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  time: String,
  title: String,
  description: String,
  type: { type: String, enum: ['travel', 'sightseeing', 'food', 'stay', 'activity', 'rest'] },
  cost: Number,
  duration: Number,
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
}, { _id: true });

const daySchema = new mongoose.Schema({
  day: Number,
  date: Date,
  title: String,
  location: String,
  activities: [activitySchema],
  accommodation: { type: mongoose.Schema.Types.ObjectId, ref: 'Stay' },
  notes: String,
  outfitSuggestion: String,
  weatherNote: String,
}, { _id: true });

const itinerarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  days: [daySchema],
  totalDays: Number,
  groupSize: { type: Number, default: 1 },
  budget: {
    target: Number,
    transit: Number,
    stay: Number,
    food: Number,
    activities: Number,
    misc: Number,
    total: Number,
  },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['draft', 'active', 'completed', 'archived'], default: 'draft' },
  isAIGenerated: { type: Boolean, default: false },
  packingList: [{ item: String, packed: Boolean }],
  expenses: [{
    date: Date,
    category: String,
    amount: Number,
    note: String,
  }],
}, { timestamps: true });

export default mongoose.model('Itinerary', itinerarySchema);
