import { Router, Request, Response } from 'express';  // Tambahkan Request dan Response dari Express
import { registerUser, loginUser } from '../services/auth.service';  // Mengimpor fungsi dari auth.services

// Fungsi handler untuk register
export const register = (req: Request, res: Response) => {  // Tambahkan tipe Request dan Response
  return registerUser(req, res);
};

// Fungsi handler untuk login
export const login = (req: Request, res: Response) => {  // Tambahkan tipe Request dan Response
  return loginUser(req, res);
};


