import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Interface custom untuk JwtPayload
export interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: string;
}

// Perpanjang interface Request untuk menyertakan properti user
export interface AuthenticatedRequest extends Request {
  user?: CustomJwtPayload; 
}

// Middleware verifikasi token
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as CustomJwtPayload;

    // Simpan informasi pengguna di dalam request
    (req as AuthenticatedRequest).user = decoded; 

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token is invalid' });
    }

    console.error('JWT verification failed:', err); 
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware otorisasi peran
export const roleMiddleware = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const user = (req as AuthenticatedRequest).user; 

  if (!user) {
    return res.status(401).json({ message: 'Authorization denied, no user found' });
  }

  if (!roles.includes(user.role)) {
    return res.status(403).json({ message: `Access denied for role: ${user.role}` });
  }

  next();
};
