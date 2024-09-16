import { Request, Response } from 'express';
import { AuthenticatedRequest } from "@/middlewares/auth.middleware";
import prisma from '@/prismaClient';

export const getUserDiscount = async (req: Request, res: Response) => {
    const user = (req as AuthenticatedRequest).user;

    if (!user) {
        res.status(400).send({
            error: 'Can not find user'
        });
    }

    const userFromDB = await prisma.users.findUnique({
        where: {
            id: Number(user?.userId) || 0
        }
    })

    let discountActive = (userFromDB?.discount_active) || false;
    const discountExpiryDate = userFromDB?.discount_expiry_date;
    const today = new Date();

    if (today > new Date(discountExpiryDate || '')) {
        discountActive = false;
    }

    res.status(200).json({
        discountActive
    })
}

export const getUserEvents = async (req: Request, res: Response) => {
    const user = (req as AuthenticatedRequest).user;

    if (!user) {
        res.status(400).send({
            error: 'Can not find user'
        });
    }

    let transactions: any = await prisma.$queryRaw`
        SELECT DISTINCT(a.event_id), b.*, c.rating FROM tx_transactions a 
        LEFT JOIN ms_events b ON a.event_id = b.id 
        LEFT JOIN tx_events_review c ON (a.user_id = c.user_id AND a.event_id = c.event_id) 
        WHERE a.user_id = ${user?.userId || 0}
    `;

    const currentDate = new Date();

    console.log(transactions);

    const categorizedEvent = transactions.reduce((acc: any, event: any) => {
        const eventDate = new Date(event.event_date);

        if (eventDate < currentDate) {
            acc.past.push(event);
        } else {
            acc.upcoming.push(event);
        }

        return acc;
    }, {past: [], upcoming: []})

    res.status(200).json({
        categorizedEvent
    })
}