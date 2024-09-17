import { Router } from "express";
import { ReviewController } from "@/controllers/review.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { roleMiddleware } from "@/middlewares/role.middleware";
import { Role } from "@/types/role";

export class ReviewRouter {
    private router: Router;
    private reviewController: ReviewController;

    constructor() {
        this.reviewController = new ReviewController()
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post('/',authMiddleware, roleMiddleware([Role.CUSTOMER]), this.reviewController.createReview)
        this.router.get('/reviews/:event_id', this.reviewController.getReviews)
    }

    getRouter(): Router {
        return this.router
    }
}