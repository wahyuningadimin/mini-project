import { Router, Request, Response } from 'express';
import { EventController } from '@/controllers/event.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { roleMiddleware } from '@/middlewares/role.middleware';
import { Role } from '@/types/role';


export class EventRouter {
  public router: Router;
  private eventController: EventController;

  constructor() {
    this.eventController = new EventController()
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Authenticated
    this.router.post('/createEvent', authMiddleware, roleMiddleware([Role.ORGANIZER]), this.eventController.createEvent);
    this.router.patch('/:id', authMiddleware, roleMiddleware([Role.ORGANIZER]), this.eventController.editEvent);
    this.router.post('/eventCheckout', authMiddleware, roleMiddleware([Role.CUSTOMER]),this.eventController.eventCheckout)
    this.router.delete('/:id', authMiddleware, roleMiddleware([Role.ORGANIZER]), this.eventController.deleteEvent)

    // Public
    this.router.get('/paginated', this.eventController.getEventsPaginated);
    this.router.get('/locations', this.eventController.getLocations);
    this.router.get('/:id', this.eventController.getEventById)
    this.router.get('/getEventTiers/:eventId', this.eventController.getEventTiers)
  }

  public getRouter(): Router {
    return this.router;
  }
}
