import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { success, failure } from '../utils/apiResponse.js';
import { AppError } from '../middleware/errorHandler.js';
import { JWT_COOKIE_NAME, JWT_EXPIRES_IN, COOKIE_MAX_AGE } from '../utils/constants.js';

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function sendTokenCookie(res, token) {
  res.cookie(JWT_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) throw new AppError('Email already registered', 409);

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    sendTokenCookie(res, token);
    success(res, { user, token }, 'Account created', 201);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Invalid email or password', 401);
    }
    const token = signToken(user._id);
    sendTokenCookie(res, token);
    success(res, { user, token }, 'Logged in');
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res) {
  res.clearCookie(JWT_COOKIE_NAME);
  success(res, null, 'Logged out');
}

export async function getMe(req, res) {
  success(res, { user: req.user });
}

export async function updateProfile(req, res, next) {
  try {
    const { name, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, preferences },
      { new: true, runValidators: true }
    );
    success(res, { user });
  } catch (err) {
    next(err);
  }
}
