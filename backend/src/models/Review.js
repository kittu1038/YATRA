import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  stay: { type: mongoose.Schema.Types.ObjectId, ref: 'Stay' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: String,
  body: { type: String, required: true, minlength: 20 },
  visitedOn: Date,
  isVerified: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  helpfulCount: { type: Number, default: 0 },
}, { timestamps: true });

reviewSchema.index({ destination: 1, status: 1 });
reviewSchema.index({ stay: 1, status: 1 });

export default mongoose.model('Review', reviewSchema);
