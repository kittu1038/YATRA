import { Router } from 'express';
import { getFoods, getFoodById, createFood } from '../controllers/foodController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getFoods);
router.get('/:id', getFoodById);
router.post('/', requireAuth, requireAdmin, createFood);

export default router;
