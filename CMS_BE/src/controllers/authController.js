import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendConfirmationEmail from '../utils/sendConfirmationEmail.js';
import User from '../models/Users.js';
import Role from '../models/Roles.js';

export const registerUser = async (req, res) => {
  const { fullName, password, email, phone, address } = req.body;

  try {
    const verifiedUser = await User.findOne({ where: { email: email, is_active: true } });
    if (verifiedUser) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }

    const unverifiedUser = await User.findOne({ where: { email: email, is_active: false } });
    if (unverifiedUser) {
      await unverifiedUser.destroy();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      full_name: fullName,
      password: hashedPassword,
      email: email,
      phone: phone,
      role_id: req.roleId,
      address: address,
      is_active: false,
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    try {
      await sendConfirmationEmail(email, token);
    } catch {
      return res.status(500).json({ message: 'Error sending confirmation email.' });
    }

    return res.status(200).json({
      message: 'Registration successful! Please check your email to confirm your account.',
    });
  } catch {
    return res.status(500).json({ message: 'Error during registration process.' });
  }
};

export const confirmAccount = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.redirect(`${process.env.FRONTEND_URL}/auth/verify-failed`);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);

    if (!user || user.is_active) {
      return res.redirect(`${process.env.FRONTEND_URL}/auth/verify-failed`);
    }

    user.is_active = true;
    await user.save();

    return res.redirect(`${process.env.FRONTEND_URL}/auth/verify-success`);
  } catch {
    return res.redirect(`${process.env.FRONTEND_URL}/auth/verify-failed`);
  }
};
