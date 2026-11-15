import mongoose from 'mongoose';

const roomTypeSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['dorm', 'private', 'suite', 'deluxe'] },
  pricePerNight: Number,
  capacity: Number,
  amenities: [String],
  images: [String],
}, { _id: false });

const staySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  type: { type: String, enum: ['hotel', 'hostel', 'guesthouse', 'resort', 'homestay'], required: true },
  description: String,
  heroImage: String,
  images: [String],
  address: String,
  coordinates: { lat: Number, lng: Number },
  distanceFromCenter: Number,
  priceRange: { min: Number, max: Number },
  currency: { type: String, default: 'INR' },
  roomTypes: [roomTypeSchema],
  amenities: [String],
  policies: {
    checkIn: String,
    checkOut: String,
    cancellation: String,
  },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  contactPhone: String,
  contactEmail: String,
}, { timestamps: true });

export default mongoose.model('Stay', staySchema);
