import { CustomJwtPayload } from '../middlewares/auth.middleware'; // Sesuaikan path

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}
