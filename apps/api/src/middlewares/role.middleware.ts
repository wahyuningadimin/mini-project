import { Request, Response, NextFunction } from 'express';
import { CustomJwtPayload } from './auth.middleware'; 

// Define AuthenticatedRequest type untuk akses properti user
interface AuthenticatedRequest extends Request {
  user?: CustomJwtPayload;
}

// Middleware untuk otorisasi berdasarkan role
export const roleMiddleware = (roles: string | string[]) => (req: Request, res: Response, next: NextFunction) => {
  const user = (req as AuthenticatedRequest).user; // Akses user dari request yang sudah diotentikasi

  if (!user) {
    return res.status(401).json({ message: 'Authorization denied, no user found' });
  }

  // Konversi `roles` menjadi array jika hanya string tunggal
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  // Cek apakah role user sesuai dengan yang diizinkan
  if (!allowedRoles.includes(user.role)) {
    return res.status(403).json({ message: `Access denied for role: ${user.role}` });
  }

  next();
};
