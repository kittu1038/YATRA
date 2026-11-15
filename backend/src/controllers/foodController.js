import Food from '../models/Food.js';
import { success } from '../utils/apiResponse.js';
import { AppError } from '../middleware/errorHandler.js';

export async function getFoods(req, res, next) {
  try {
    const { destination, type, cuisine, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (destination) filter.destination = destination;
    if (type) filter.type = type;
    if (cuisine) filter.cuisine = cuisine;

    const skip = (page - 1) * limit;
    const [foods, total] = await Promise.all([
      Food.find(filter).populate('destination', 'name slug').skip(skip).limit(Number(limit)),
      Food.countDocuments(filter),
    ]);
    success(res, { foods, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
}

export async function getFoodById(req, res, next) {
  try {
    const food = await Food.findById(req.params.id).populate('destination');
    if (!food) throw new AppError('Food entry not found', 404);
    success(res, { food });
  } catch (err) {
    next(err);
  }
}

export async function createFood(req, res, next) {
  try {
    const food = await Food.create(req.body);
    success(res, { food }, 'Food entry created', 201);
  } catch (err) {
    next(err);
  }
}
