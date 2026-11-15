import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  type: { type: String, enum: ['veg', 'non-veg', 'both'], required: true },
  cuisine: { type: String, enum: ['rajasthani', 'pahadi', 'north-indian', 'street-food', 'cafe'] },
  description: String,
  image: String,
  dishes: [{
    name: String,
    price: Number,
    isSignature: Boolean,
    isVeg: Boolean,
  }],
  priceRange: { min: Number, max: Number },
  currency: { type: String, default: 'INR' },
  address: String,
  timings: { open: String, close: String },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  mustTry: [String],
  tags: [String],
}, { timestamps: true });

export default mongoose.model('Food', foodSchema);
