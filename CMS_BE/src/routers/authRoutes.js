import express from 'express';
import {
  login,
  forgotPassword,
  resetPassword,
  registerUser,
  confirmAccount,
  verifyResetToken,
} from '../controllers/authController.js';
import passport from 'passport';
import { validateRegister } from '../validates/validateRegister.js';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureMessage: true,
    failWithError: true,
  }),
  async (req, res) => {
    try {
      const user = req.user;

      const token = jwt.sign(
        {
          user_id: user.id,
          full_name: user.full_name,
          role_id: user.role_id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      const redirectUrl = `${process.env.FRONTEND_URL}/login/callback?token=${token}&user_id=${user.id}&full_name=${encodeURIComponent(user.full_name)}&role_id=${user.role_id}`;
      res.redirect(redirectUrl);
    } catch (error) {
      return res.status(500).json({ message: 'Login failed', error: error.message });
    }
  }
);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/register', validateRegister, registerUser);
router.get('/confirm', confirmAccount);
router.post('/verify-reset-token', verifyResetToken);
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${process.env.FRONTEND_URL}/login`);
});

export default router;
