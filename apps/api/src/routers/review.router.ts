import { Router } from "express";
import { uploader } from "../middlewares/uploader";
import { ReviewController } from "@/controllers/review.controller";

export class EventRouter {
    private router: Router;
    private reviewController: ReviewController;

    constructor() {
        this.reviewController = new ReviewController()
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post('/review', this.reviewController.createReview)
        this.router.get('/reviews/:event_id', this.reviewController.getReviews)
    }

    getRouter(): Router {
        return this.router
    }
}