import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendConfirmationEmail from '../utils/sendConfirmationEmail.js';
import User from '../models/Users.js';     
import Role from '../models/Roles.js'; 

export const registerUser = async (req, res) => {
    const { fullName, password, email, phone, address, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        return res.status(409).json({ message: 'Email is already in use.' });
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
  
      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '3600s' });
  
      try {
        await sendConfirmationEmail(email, token);
        console.log('Confirmation email sent successfully to', email);
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        return res.status(500).json({ message: 'Error sending confirmation email.' });
      }
  
      return res.status(200).json({
        message: 'Registration successful! Please check your email to confirm your account.',
      });
  
    } catch (err) {
      console.error('Error during registration:', err);
      return res.status(500).json({ message: 'Error processing registration.' });
    }
  };
  

export const confirmAccount = async (req, res) => {
    const token = req.query.token;

    if (!token) {
        return res.status(400).send('Missing token.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(404).send('User not found.');
        }

        if (user.is_active) {
            return res.redirect(`${process.env.FRONTEND_URL}/auth/verify-success`);
        }

        user.is_active = true;
        await user.save();

        return res.redirect(`${process.env.FRONTEND_URL}/auth/verify-success`);
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return res.status(400).send('Confirmation link is invalid or has expired.');
    }
};
