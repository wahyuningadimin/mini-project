import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware'; // Import from new file

const router = Router();

router.get('/customer-only', authMiddleware, roleMiddleware('CUSTOMER'), (req, res) => {
  res.send('Access granted: Customer');
});

router.get('/organizer-only', authMiddleware, roleMiddleware('ORGANIZER'), (req, res) => {
  res.send('Access granted: Organizer');
});

export default router;
