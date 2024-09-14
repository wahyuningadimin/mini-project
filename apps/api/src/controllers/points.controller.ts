// import { Request, Response } from 'express';
// import prisma from '../prismaClient';

// export const redeemPoints = async (req: Request, res: Response) => {
//   const { userId, ticketPrice } = req.body;

//   try {
//     // Dapatkan semua poin yang belum kedaluwarsa
//     const pointsData = await prisma.usersPoints.findMany({
//       where: { userId, expiresAt: { gt: new Date() } },
//     });

//     const totalPoints = pointsData.reduce((acc, point) => acc + point.points, 0);

//     if (totalPoints === 0) {
//       return res.status(400).json({ message: 'No points available' });
//     }

//     // Tentukan harga akhir setelah redeem
//     const finalPrice = ticketPrice - totalPoints > 0 ? ticketPrice - totalPoints : 0;

//     // Update poin yang digunakan
//     await prisma.usersPoints.updateMany({
//       where: { userId, expiresAt: { gt: new Date() } },
//       data: { points: 0 }, // Reset poin setelah digunakan
//     });

//     res.json({ finalPrice, message: 'Points redeemed successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error redeeming points' });
//   }
// };
