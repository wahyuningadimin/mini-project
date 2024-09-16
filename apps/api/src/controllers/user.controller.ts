import { Router, Request, Response } from 'express';  // Tambahkan Request dan Response dari Express
import { getUserDiscount } from '@/services/user.service';

// Fungsi handler untuk register
export const getDiscount = (req: Request, res: Response) => {  // Tambahkan tipe Request dan Response
  return getUserDiscount(req, res);
};