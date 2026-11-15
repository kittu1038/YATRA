import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['transit', 'stay', 'food', 'activities', 'shopping', 'misc'],
    default: 'misc',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'upi', 'card', 'netbanking', 'other'],
    default: 'upi',
  },
  note: {
    type: String,
    default: '',
  },
  receiptUrl: {
    type: String,
    default: '',
  },
}, { timestamps: true });

expenseSchema.index({ trip: 1, date: -1 });
expenseSchema.index({ user: 1, date: -1 });

export default mongoose.model('Expense', expenseSchema);
