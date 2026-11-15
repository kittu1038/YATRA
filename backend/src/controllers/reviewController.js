import Review from '../models/Review.js';
import Destination from '../models/Destination.js';
import Stay from '../models/Stay.js';
import { success } from '../utils/apiResponse.js';
import { AppError } from '../middleware/errorHandler.js';

export async function getReviews(req, res, next) {
  try {
    const { destination, stay, status = 'approved' } = req.query;
    const filter = { status };
    if (destination) filter.destination = destination;
    if (stay) filter.stay = stay;

    const reviews = await Review.find(filter).populate('user', 'name avatar').sort({ createdAt: -1 });
    success(res, { reviews });
  } catch (err) {
    next(err);
  }
}

export async function createReview(req, res, next) {
  try {
    const review = await Review.create({ ...req.body, user: req.user._id });

    if (req.body.destination) {
      await updateEntityRating(Destination, req.body.destination);
    }
    if (req.body.stay) {
      await updateEntityRating(Stay, req.body.stay);
    }

    success(res, { review }, 'Review submitted for moderation', 201);
  } catch (err) {
    next(err);
  }
}

export async function moderateReview(req, res, next) {
  try {
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!review) throw new AppError('Review not found', 404);
    success(res, { review });
  } catch (err) {
    next(err);
  }
}

async function updateEntityRating(Model, id) {
  const reviews = await Review.find({ destination: id, status: 'approved' });
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);
  await Model.findByIdAndUpdate(id, { rating: avg.toFixed(1), reviewCount: reviews.length });
}
