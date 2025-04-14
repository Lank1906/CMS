import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ message: 'Authorization token is missing or malformed' });
    }


    const token = authHeader.split(' ')[1];


    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.user = decoded;


    next();
  } catch (error) {
    console.error('Token verification error:', error);


    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired, please login again' });
    }


    return res.status(403).json({ message: 'Invalid token or unauthorized' });
  }
};

export default authMiddleware;
