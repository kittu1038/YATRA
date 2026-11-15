import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import destinationRoutes from './src/routes/destinations.js';
import stayRoutes from './src/routes/stays.js';
import foodRoutes from './src/routes/food.js';
import reviewRoutes from './src/routes/reviews.js';
import tripRoutes from './src/routes/trips.js';
import aiRoutes from './src/routes/ai.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/stays', stayRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', version: '1.0.0' }));

app.use(errorHandler);

app.listen(PORT, () => console.log(`YATRA API running on :${PORT}`));

export default app;

