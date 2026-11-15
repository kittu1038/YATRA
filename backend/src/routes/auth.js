import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, logout, getMe, updateProfile } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/register',
  [body('name').trim().notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  validate,
  register
);

router.post('/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validate,
  login
);

router.post('/logout', logout);
router.get('/me', requireAuth, getMe);
router.put('/profile', requireAuth, updateProfile);

export default router;
