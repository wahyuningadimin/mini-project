import { AuthenticatedRequest } from '@/middlewares/auth.middleware';
import prisma from '@/prismaClient';
import { Request, Response } from 'express';

export const createReview = async (req: Request, res: Response) => {
    const user = (req as AuthenticatedRequest).user;
    const { event_id, rating, review } = req.body;

    if (!user) {
        res.status(400).json({ message: 'Unable to find user!' });
    }
    
    try {
        // Validate event
        const event = await prisma.events.findUnique({
            where: {
                id: event_id
            }
        })
    
        if (!event) {
            res.status(400).json({ message: 'Unable to find event!' });
        }

        await prisma.eventsReview.create({
            data: {
                event_id: Number(event_id),
                user_id: Number(user?.userId) || 0,
                rating: Number(rating),
                review: review,
                created_date: new Date()
            }
        })

        res.status(200).json({
            message: "Review has been submitted!"
        })
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error: error });
    }

}