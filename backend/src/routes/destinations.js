import { Router } from 'express';
import {
  getAllDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
  getTrendingDestinations,
} from '../controllers/destinationController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getAllDestinations);
router.get('/trending', getTrendingDestinations);
router.get('/:slug', getDestinationBySlug);
router.post('/', requireAuth, requireAdmin, createDestination);
router.put('/:id', requireAuth, requireAdmin, updateDestination);
router.delete('/:id', requireAuth, requireAdmin, deleteDestination);

export default router;
