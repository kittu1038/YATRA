import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from './errorHandler.js';
import { JWT_COOKIE_NAME } from '../utils/constants.js';

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies[JWT_COOKIE_NAME] || req.headers.authorization?.split(' ')[1];
    if (!token) throw new AppError('Authentication required', 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) throw new AppError('User no longer exists', 401);

    req.user = user;
    next();
  } catch (err) {
    next(err instanceof AppError ? err : new AppError('Invalid or expired token', 401));
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return next(new AppError('Admin access required', 403));
  }
  next();
}
