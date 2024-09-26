import { Request, Response } from "express";
import prisma from "../prisma";
import { createReview } from "@/services/review.service";

export class ReviewController {
    async createReview(req: Request, res: Response) {
        return createReview(req, res);
    }

    async getReviews(req: Request, res: Response) {
        try {
            const { eventId } = req.params;
            const reviews = await prisma.eventsReview.findMany({
                where: { event_id: Number(eventId) },
                orderBy: { created_date: 'desc' }
            });
            res.status(200).send({ 
                status: 'ok', 
                reviews 
            });
        } catch (err) {
            res.status(400).send({ 
                status: 'error', 
                msg: err 
            });
        }
    }
}
