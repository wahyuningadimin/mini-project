import { Router } from "express";
import { uploader } from "../middlewares/uploader";
// import { verifyToken } from "../middlewares/token";
import { EventController } from "@/controllers/event.controller";

export class EventRouter {
    private router: Router;
    private eventController: EventController;

    constructor() {
        this.eventController = new EventController()
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post('/createEvent', this.eventController.createEvent)
        this.router.patch('/:id', this.eventController.editEvent)
        this.router.get('/', this.eventController.getEvents)
        this.router.get('/:id', this.eventController.getEventById)
        this.router.get('/getEventTiers/:eventId', this.eventController.getEventTiers)
        this.router.post('/eventCheckout', this.eventController.eventCheckout)
        this.router.delete('/:id', this.eventController.deleteEvent)
    }

    getRouter(): Router {
        return this.router
    }
}