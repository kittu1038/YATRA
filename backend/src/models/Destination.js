import mongoose from 'mongoose';

const coordinatesSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
}, { _id: false });

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  state: { type: String, required: true },
  region: String,
  type: { type: String, enum: ['temple', 'hill-station', 'heritage', 'adventure', 'pilgrimage', 'wildlife'], required: true },
  tagline: String,
  description: { type: String, required: true },
  heroImage: String,
  images: [String],
  coordinates: coordinatesSchema,
  elevation: Number,
  bestTimeToVisit: [String],
  weather: {
    summer: String,
    monsoon: String,
    winter: String,
  },
  entryFee: {
    indian: Number,
    foreign: Number,
    currency: { type: String, default: 'INR' },
  },
  timings: {
    open: String,
    close: String,
    closedOn: [String],
  },
  avgStayDays: { type: Number, default: 2 },
  avgDailyCost: { type: Number },
  tags: [String],
  highlights: [String],
  nearbyPlaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  dressCode: String,
  culturalNotes: String,
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
}, { timestamps: true });

destinationSchema.index({ name: 'text', tags: 'text', region: 'text' });

export default mongoose.model('Destination', destinationSchema);
