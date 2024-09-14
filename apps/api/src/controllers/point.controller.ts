import { Request, Response } from 'express';
import { getActivePoints, redeemPoints } from '@/services/point.service';

export class PointController {
  async getActivePoints(req: Request, res: Response) {
    return getActivePoints(req, res);
  };

  async redeemPoints(req: Request, res: Response) {
    return redeemPoints(req, res);
  };
}
