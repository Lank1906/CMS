import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  const rawToken = authHeader.split(' ');
  if (rawToken.length <= 1) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  const token = rawToken[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
      }
      req.user = payload;
      next();
    });
  } catch {
    return res.status(403).json({ message: 'Forbidden - Invalid token' });
  }
};
