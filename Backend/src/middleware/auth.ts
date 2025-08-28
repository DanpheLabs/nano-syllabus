import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import User from "../models/User.model";

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  try {
    // Try to get token from multiple sources
    let token = null;
    
    console.log('=== AUTH MIDDLEWARE DEBUG ===');
    console.log('Authorization header:', req.header('Authorization'));
    console.log('Cookies:', req.cookies);
    console.log('Query token:', req.query.token);
    console.log('Body token:', req.body?.token);
    
    // 1. From Authorization header (Bearer token)
    if (req.header('Authorization')) {
      const authHeader = req.header('Authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.replace('Bearer ', '');
      } else {
        token = authHeader; // In case someone sends token directly without Bearer prefix
      }
    }
    
    // 2. From cookies
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    
    // 3. From query parameters
    if (!token && req.query.token) {
      token = req.query.token as string;
    }
    
    // 4. From request body (for POST requests)
    if (!token && req.body.token) {
      token = req.body.token;
    }
    
    console.log('Final token to verify:', token?.substring(0, 50) + '...');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string, email: string };
    console.log('Decoded token:', decoded);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token - user not found' });
    }

    req.user = user;
    console.log('Auth middleware - User set:', { id: user._id, email: user.email }); // Debug log
    console.log('=== AUTH MIDDLEWARE SUCCESS ===');
    next();
  } catch (error) {
    console.error('Auth middleware error:', error); // Debug log
    res.status(401).json({ error: 'Invalid token' });
  }
};

export { authMiddleware}
