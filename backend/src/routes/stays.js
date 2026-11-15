import { Router } from 'express';
import { getStays, getStayBySlug, createStay, updateStay, deleteStay } from '../controllers/stayController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getStays);
router.get('/:slug', getStayBySlug);
router.post('/', requireAuth, requireAdmin, createStay);
router.put('/:id', requireAuth, requireAdmin, updateStay);
router.delete('/:id', requireAuth, requireAdmin, deleteStay);

export default router;
