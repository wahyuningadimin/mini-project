import { Router, Request, Response } from 'express';  // Tambahkan Request dan Response dari Express
import { registerUser, loginUser } from '../services/auth.service';  // Mengimpor fungsi dari auth.services

const authRoutes = Router();  // Membuat instance Router

// Mendefinisikan rute POST untuk register dan login
authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);

// Fungsi handler untuk register
export const register = (req: Request, res: Response) => {  // Tambahkan tipe Request dan Response
  return registerUser(req, res);
};

// Fungsi handler untuk login
export const login = (req: Request, res: Response) => {  // Tambahkan tipe Request dan Response
  return loginUser(req, res);
};

export { authRoutes };  // Export authRoutes sebagai named export
