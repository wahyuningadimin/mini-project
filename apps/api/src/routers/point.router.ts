import { Router, Request, Response } from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { roleMiddleware } from '@/middlewares/role.middleware';
import { PointController } from '@/controllers/point.controller';
import { Role } from '@/types/role';


export class PointRouter {
  public router: Router;
  private pointController: PointController;

  constructor() {
    this.pointController = new PointController();
    this.router = Router();
    this.initializeRoutes();
  }

    private initializeRoutes(): void {
        this.router.get('/getActivePoints', authMiddleware, roleMiddleware([Role.CUSTOMER]), this.pointController.getActivePoints);
        this.router.post('/redeemPoints', authMiddleware, roleMiddleware([Role.CUSTOMER]), this.pointController.redeemPoints);
    }

  public getRouter(): Router {
    return this.router;
  }
}
