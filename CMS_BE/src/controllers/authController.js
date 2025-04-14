import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        user_id: user.UserID,
        user_name: user.user_name,
        role_id: user.role_id,
      },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );
    return res.status(200).json({
      message: 'Login successful',
      token: token,
      user_name: user.user_name,
      role_id: user.role_id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
