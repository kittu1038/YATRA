import Trip from '../models/Trip.js';
import Expense from '../models/Expense.js';
import { success } from '../utils/apiResponse.js';
import { AppError } from '../middleware/errorHandler.js';

export async function getUserTrips(req, res, next) {
  try {
    const trips = await Trip.find({ user: req.user._id })
      .populate('destinations', 'name slug heroImage state')
      .populate('stays', 'name slug priceRange type')
      .sort({ updatedAt: -1 });

    success(res, { trips });
  } catch (err) {
    next(err);
  }
}

export async function getTripById(req, res, next) {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id })
      .populate('destinations')
      .populate('stays')
      .populate('itinerary');

    if (!trip) throw new AppError('Trip not found', 404);

    const expenses = await Expense.find({ trip: trip._id }).sort({ date: -1 });

    success(res, { trip, expenses });
  } catch (err) {
    next(err);
  }
}

export async function createTrip(req, res, next) {
  try {
    const trip = await Trip.create({
      ...req.body,
      user: req.user._id,
    });

    const populated = await Trip.findById(trip._id)
      .populate('destinations')
      .populate('stays');

    success(res, { trip: populated }, 'Trip created successfully', 201);
  } catch (err) {
    next(err);
  }
}

export async function updateTrip(req, res, next) {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    )
      .populate('destinations')
      .populate('stays')
      .populate('itinerary');

    if (!trip) throw new AppError('Trip not found', 404);

    success(res, { trip }, 'Trip updated successfully');
  } catch (err) {
    next(err);
  }
}

export async function deleteTrip(req, res, next) {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!trip) throw new AppError('Trip not found', 404);

    await Expense.deleteMany({ trip: req.params.id });

    success(res, null, 'Trip and associated expenses deleted');
  } catch (err) {
    next(err);
  }
}

export async function addExpense(req, res, next) {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, user: req.user._id });
    if (!trip) throw new AppError('Trip not found', 404);

    const expense = await Expense.create({
      ...req.body,
      trip: trip._id,
      user: req.user._id,
    });

    success(res, { expense }, 'Expense logged', 201);
  } catch (err) {
    next(err);
  }
}

export async function getExpenses(req, res, next) {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, user: req.user._id });
    if (!trip) throw new AppError('Trip not found', 404);

    const expenses = await Expense.find({ trip: trip._id }).sort({ date: -1 });
    success(res, { expenses });
  } catch (err) {
    next(err);
  }
}

export async function deleteExpense(req, res, next) {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.expenseId,
      user: req.user._id,
    });

    if (!expense) throw new AppError('Expense not found', 404);

    success(res, null, 'Expense deleted');
  } catch (err) {
    next(err);
  }
}
