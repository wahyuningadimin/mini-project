import { Request, Response } from "express";
import prisma from "../prisma";

export class ReviewController {
    async createReview(req: Request, res: Response) {
        try {
            const { event_id, user_id, created_date, rating, review } = req.body;

            if (!event_id || rating < 1 || rating > 5 || !review) {
                return res.status(400).send({ 
                    status: 'error', 
                    msg: 'Invalid input' 
                });
            }
        
            const createreview = await prisma.eventsReview.create({
                data: {
                    event_id,
                    user_id,
                    created_date,
                    rating,
                    review,
                    
                }
            });

            // Update event's average rating and review count
            // const reviews = await prisma.eventsReview.findMany({
            //     where: { event_id },
            //     select: { rating: true }
            // });

            // const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            // const averageRating = totalRating / reviews.length;

            // await prisma.events.update({
            //     where: { id: event_id },
            //     data: {
            //         averageRating,
            //         reviewCount: reviews.length
            //     }
            // });

            res.status(201).send({
                status: 'ok',
                msg: 'Review created!',
                createreview
            });
        } catch (err) {
            res.status(400).send({ 
                status: 'error',
                msg: err
            });
        }
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
