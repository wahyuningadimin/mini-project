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
        SELECT a.*, b.* FROM tx_transactions a
        LEFT JOIN ms_events b ON a.event_id = b.id
        WHERE a.user_id = ${user?.userId || 0}
    `;

    // const mappedTransaction = transactions.map((data) => {
    //     return {

    //     }
    // })
}