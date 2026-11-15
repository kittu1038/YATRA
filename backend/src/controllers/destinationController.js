import Destination from '../models/Destination.js';
import { success } from '../utils/apiResponse.js';
import { AppError } from '../middleware/errorHandler.js';

export async function getAllDestinations(req, res, next) {
  try {
    const { type, state, featured, trending, search, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (state) filter.state = { $regex: state, $options: 'i' };
    if (featured === 'true') filter.isFeatured = true;
    if (trending === 'true') filter.isTrending = true;
    if (search) filter.$text = { $search: search };

    const skip = (page - 1) * limit;
    const [destinations, total] = await Promise.all([
      Destination.find(filter).skip(skip).limit(Number(limit)).sort({ isFeatured: -1, rating: -1 }),
      Destination.countDocuments(filter),
    ]);

    success(res, { destinations, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
}

export async function getDestinationBySlug(req, res, next) {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug }).populate('nearbyPlaces', 'name slug heroImage type');
    if (!destination) throw new AppError('Destination not found', 404);
    success(res, { destination });
  } catch (err) {
    next(err);
  }
}

export async function createDestination(req, res, next) {
  try {
    const destination = await Destination.create(req.body);
    success(res, { destination }, 'Destination created', 201);
  } catch (err) {
    next(err);
  }
}

export async function updateDestination(req, res, next) {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!destination) throw new AppError('Destination not found', 404);
    success(res, { destination });
  } catch (err) {
    next(err);
  }
}

export async function deleteDestination(req, res, next) {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    success(res, null, 'Destination deleted');
  } catch (err) {
    next(err);
  }
}

export async function getTrendingDestinations(req, res, next) {
  try {
    const destinations = await Destination.find({ isTrending: true }).limit(6).sort({ rating: -1 });
    success(res, { destinations });
  } catch (err) {
    next(err);
  }
}
