import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload | string; // Tambahkan string karena payload bisa saja berupa string
  }
}
