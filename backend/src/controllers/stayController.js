import Stay from '../models/Stay.js';
import { success } from '../utils/apiResponse.js';
import { AppError } from '../middleware/errorHandler.js';

export async function getStays(req, res, next) {
  try {
    const { destination, type, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (destination) filter.destination = destination;
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter['priceRange.min'] = {};
      if (minPrice) filter['priceRange.min'].$gte = Number(minPrice);
      if (maxPrice) filter['priceRange.max'] = { $lte: Number(maxPrice) };
    }

    const skip = (page - 1) * limit;
    const [stays, total] = await Promise.all([
      Stay.find(filter).populate('destination', 'name slug').skip(skip).limit(Number(limit)),
      Stay.countDocuments(filter),
    ]);

    success(res, { stays, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
}

export async function getStayBySlug(req, res, next) {
  try {
    const stay = await Stay.findOne({ slug: req.params.slug }).populate('destination', 'name slug state');
    if (!stay) throw new AppError('Stay not found', 404);
    success(res, { stay });
  } catch (err) {
    next(err);
  }
}

export async function createStay(req, res, next) {
  try {
    const stay = await Stay.create(req.body);
    success(res, { stay }, 'Stay created', 201);
  } catch (err) {
    next(err);
  }
}

export async function updateStay(req, res, next) {
  try {
    const stay = await Stay.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stay) throw new AppError('Stay not found', 404);
    success(res, { stay });
  } catch (err) {
    next(err);
  }
}

export async function deleteStay(req, res, next) {
  try {
    await Stay.findByIdAndDelete(req.params.id);
    success(res, null, 'Stay deleted');
  } catch (err) {
    next(err);
  }
}
