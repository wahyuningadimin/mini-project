import { Router, Request, Response } from 'express';

export class EventRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.getAllEvents);
    this.router.post('/', this.createEvent);
  }

  // Contoh handler untuk mendapatkan semua event
  private getAllEvents(req: Request, res: Response) {
    res.json({ message: 'Get all events' });
  }

  // Contoh handler untuk membuat event baru
  private createEvent(req: Request, res: Response) {
    res.json({ message: 'Create new event' });
  }

  public getRouter(): Router {
    return this.router;
  }
}
