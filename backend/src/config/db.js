import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/yatra';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn('⚠️ MongoDB local service not detected:', err.message);
    console.warn('Continuing in offline/fallback mode (Frontend fallback data active).');
  }
}
