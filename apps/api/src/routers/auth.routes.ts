import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Rute publik
router.post('/register', register);
router.post('/login', login);

// Rute yang dilindungi (contoh untuk pengguna yang telah terotentikasi)
router.get('/user-profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route for authenticated users' });
});

// Rute yang dilindungi untuk peran tertentu
router.get('/admin-dashboard', authMiddleware, roleMiddleware(['ADMIN', 'SUPERADMIN']), (req, res) => {
  res.json({ message: 'This is a protected route for ADMIN and SUPERADMIN' });
});

export default router;
