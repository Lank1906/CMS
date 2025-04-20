import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        user_id: user.id,
        user_name: user.full_name,
        role_id: user.role_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    return res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        user_name: user.full_name,
        role_id: user.role_id,
      },
    });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
