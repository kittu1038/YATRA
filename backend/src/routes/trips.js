import { Router } from 'express';
import { body } from 'express-validator';
import {
  getUserTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  addExpense,
  getExpenses,
  deleteExpense,
} from '../controllers/tripController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.use(requireAuth);

router.get('/', getUserTrips);
router.get('/:id', getTripById);
router.post('/',
  [body('title').trim().notEmpty().withMessage('Trip title is required')],
  validate,
  createTrip
);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

router.get('/:tripId/expenses', getExpenses);
router.post(
  '/:tripId/expenses',
  [
    body('title').trim().notEmpty().withMessage('Expense title is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('category').isIn(['transit', 'stay', 'food', 'activities', 'shopping', 'misc']),
  ],
  validate,
  addExpense
);
router.delete('/:tripId/expenses/:expenseId', deleteExpense);

export default router;
