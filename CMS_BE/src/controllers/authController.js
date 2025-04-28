import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import nodemailer from 'nodemailer';
import sendConfirmationEmail from '../utils/sendConfirmationEmail.js';
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }
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
    return res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        user_id: user.id,
        full_name: user.full_name,
        role_id: user.role_id,
        email: user.email,
      },
    });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(200).json({ message: 'Password reset email has been sent.' });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    await transporter.sendMail({
      from: `"CMS System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password reset request',
      html: `
            <div style="background-color: #f4f4f7; padding: 40px 0; font-family: Arial, sans-serif;">
              <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); color: #333; line-height: 1.6;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <div style="font-size: 24px; color: #2D3052; font-weight: bold;">BlueOC</div>
                  <h2 style="color: #2D3052; margin: 0;">Reset Your Password</h2>
                </div>
                <p>Hi <strong>${user.full_name}</strong>,</p>   
                <p>We received a request to reset your password for your CMS account. Click the button below to process:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetLink}"
                    style="display: inline-block; padding: 14px 28px; background-color: #2D3052; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Reset Password
                  </a>
                </div>
                <p><strong>This link will expire in 15 minutes.</strong></p>
                <p>If you didn’t request a password reset, no further action is required.</p>
                <p>Thanks,<br/>The CMS Support Team</p>
                <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;">
                <div style="font-size: 12px; color: #999; text-align: center;">
                  <p>&copy; ${new Date().getFullYear()} CMS System. All rights reserved.</p>
                  <p>12th Floor, Technopark Tower, Vinhomes Ocean Park, Gia Lam, Hanoi</p>
                  <p>Need help? <a href="https://blueoc.tech/en/contact" style="color: #2D3052;">Contact Support</a></p>
                </div>
              </div>
            </div>
        `,
    });
    return res.json({ message: 'Password reset email has been sent.' });
  } catch {
    return res.status(500).json({ message: 'Server error.' });
  }
};
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: 'Invalid user' });
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
    return res.json({ message: 'Password updated successfully.' });
  } catch {
    return res.status(400).json({ message: 'Token is invalid or expired.' });
  }
};
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
    return res.redirect(`${process.env.FRONTEND_URL}/verify-failed`);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const existingUser = await User.findOne({ where: { email: decoded.email } });
    if (existingUser) {
      return res.redirect(`${process.env.FRONTEND_URL}/verify-failed`);
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

    return res.redirect(`${process.env.FRONTEND_URL}/verify-success`);
  } catch {
    return res.redirect(`${process.env.FRONTEND_URL}/verify-failed`);
  }
};
