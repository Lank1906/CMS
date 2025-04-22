import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendConfirmationEmail from '../utils/sendConfirmationEmail.js';
import User from '../models/Users.js';

export const registerUser = async (req, res) => {
  const { fullName, password, email, phone, address } = req.body;

  try {
    const verifiedUser = await User.findOne({ where: { email: email, is_active: true } });
    if (verifiedUser) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign(
      {
        fullName,
        password: hashedPassword,
        email,
        phone,
        address,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    try {
      await sendConfirmationEmail(email, token);
    } catch {
      return res.status(500).json({ message: 'Failed to send confirmation email.' });
    }

    return res.status(200).json({
      message: 'Registration successful! Please check your email to confirm your account.',
    });
  } catch {
    return res.status(500).json({ message: 'An error occurred during the registration process.' });
  }
};

export const confirmAccount = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.redirect(`${process.env.FRONTEND_URL}/auth/verify-failed`);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const existingUser = await User.findOne({ where: { email: decoded.email } });
    if (existingUser) {
      return res.redirect(`${process.env.FRONTEND_URL}/auth/verify-failed`);
    }

    await User.create({
      full_name: decoded.fullName,
      password: decoded.password,
      email: decoded.email,
      phone: decoded.phone,
      address: decoded.address,
      role_id: 3,
      is_active: true,
    });

    return res.redirect(`${process.env.FRONTEND_URL}/auth/verify-success`);
  } catch {
    return res.redirect(`${process.env.FRONTEND_URL}/auth/verify-failed`);
  }
};
