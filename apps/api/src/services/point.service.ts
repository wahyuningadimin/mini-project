import { AuthenticatedRequest } from "@/middlewares/auth.middleware";
import { Request, Response } from 'express';
import prisma from '../prismaClient';
import { Operations } from "@prisma/client";

export const addPoints = async (req: any, res: Response) => {
    const { userId, points } = req;
    let today = new Date();

    const expiredDate = today.setMonth(today.getMonth() + 3);

    if (!userId) {
        return res.status(400).send({
            message: 'Unable to get user details!'
        })
    }

    try {
        await prisma.usersPoints.create({
            data: {
                user_id: Number(userId),
                operations: Operations.add,
                points: points,
                expired_date: new Date(expiredDate),
            },
        });

        res.status(200).send({
            status: 'success'
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Unable to create points!'
        })
    }
}

export const getActivePoints = async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user?.userId || '';

    if (!userId) {
        return res.status(400).send({
            message: 'Unable to get user details!'
        })
    }
    console.log(userId);

    try {
        const totalAddPoints = await prisma.usersPoints.aggregate({
            _sum: {
                points: true,
            },
            where: {
                user_id: Number(userId),
                operations: 'add',
                expired_date: {
                    gte: new Date(),
                },
            },
        });

        const totalSubtractPoints = await prisma.usersPoints.aggregate({
            _sum: {
                points: true,
            },
            where: {
                user_id: Number(userId),
                operations: 'subtract',
                expired_date: {
                    gte: new Date()
                },
            },
        });

        const activePoints =
            (totalAddPoints._sum.points || 0) - (totalSubtractPoints._sum.points || 0);

        return res.status(200).send({
            activePoints
        });
    } catch (error) {
        console.error('Error calculating active points:', error);
        return res.status(500).json({
            message: 'Internal server error while calculating active points.',
        });
    }
}

export const redeemPoints = async (req: Request, res: Response) => {
    const { pointsToRedeem } = req.body;
    const userId = (req as AuthenticatedRequest).user?.userId || undefined;

    if (!userId) {
        return res.status(400).send({
            message: 'Unable to get user details!'
        })
    }

    try {
        const availablePoints = await prisma.usersPoints.findMany({
            where: {
                user_id: Number(userId),
                operations: Operations.add,
                expired_date: {
                    gte: new Date(),
                },
            },
            orderBy: {
                expired_date: 'asc',
            },
        });

        let remainingPointsToSubtract = pointsToRedeem;
        let totalAvailablePoints = 0;
        let lastExpirationDate = null;

        for (const pointEntry of availablePoints) {
            totalAvailablePoints += pointEntry.points;
            lastExpirationDate = pointEntry.expired_date;

            if (totalAvailablePoints >= remainingPointsToSubtract) {
                break;
            }
        }

        if (totalAvailablePoints < remainingPointsToSubtract) {
            return res.status(400).json({
                message: 'Not enough points available!',
            });
        }

        await prisma.usersPoints.create({
            data: {
                user_id: Number(userId),
                operations: Operations.subtract,
                points: pointsToRedeem,
                expired_date: lastExpirationDate,
            },
        });

        return res.status(200).send({
            message: `Successfully redeem ${pointsToRedeem} points.`,
            expirationDate: lastExpirationDate,
        });

    } catch (error) {
        console.error('Error subtracting points:', error);
        return res.status(500).send({
            message: 'Internal server error while subtracting points.',
        });
    }
}