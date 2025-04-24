import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }
  const rawToken = authHeader.split(' ');
  if (rawToken.length !== 2 || rawToken[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Unauthorized - Invalid token format' });
  }
  const token = rawToken[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
    req.user = payload;
    next();
  });
};
