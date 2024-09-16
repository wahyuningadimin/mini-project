import { getUserEvent } from '@/controllers/user.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { roleMiddleware } from '@/middlewares/role.middleware';
import { getUserDiscount } from '@/services/user.service';
import { Role } from '@/types/role';
import { Router } from 'express';

const router = Router();

// Rute publik
router.get('/getUserDiscount',authMiddleware, roleMiddleware([Role.CUSTOMER]), getUserDiscount);
router.get('/getUserEvents',authMiddleware, roleMiddleware([Role.CUSTOMER]), getUserEvent);

export default router;
