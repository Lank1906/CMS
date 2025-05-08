import express from 'express';
import {
  login,
  forgotPassword,
  resetPassword,
  registerUser,
  confirmAccount,
  verifyResetToken,
} from '../controllers/authController.js';
import { validateRegister } from '../validates/validateRegister.js';
const router = express.Router();

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/register', validateRegister, registerUser);
router.get('/confirm', confirmAccount);
router.post('/verify-reset-token', verifyResetToken);

export default router;
