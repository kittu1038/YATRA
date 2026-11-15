import { Router } from 'express';
import { getReviews, createReview, moderateReview } from '../controllers/reviewController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getReviews);
router.post('/', requireAuth, createReview);
router.patch('/:id/moderate', requireAuth, requireAdmin, moderateReview);

export default router;
