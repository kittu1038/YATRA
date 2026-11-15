import { Router } from 'express';
import { createItinerary, modifyItinerary } from '../controllers/aiController.js';

const router = Router();

router.post('/generate-itinerary', createItinerary);
router.post('/modify-itinerary', modifyItinerary);

export default router;
