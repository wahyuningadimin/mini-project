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
        this.router.post('/createEvent', 
            this.eventController.createEvent
        )
        this.router.get('/getEvents', this.eventController.getEvents)
    }

    getRouter(): Router {
        return this.router
    }
}