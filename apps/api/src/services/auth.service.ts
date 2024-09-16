import { Request, Response } from 'express';
import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateReferralCode } from './referral.service';
import { addPoints } from './point.service';

// Fungsi untuk register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, role, referral_code } = req.body;

    // Hash password menggunakan bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Validasi email untuk user yang existing
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email
      }
    })

    if (existingUser) {
      res.status(500).json({ error: `User with email ${email} already exists!`});
      return;
    }

    let discount_active = false;
    let discount_expiry_date = new Date();
    if (referral_code) {
      // Cek referral code
      const referralUser = await prisma.users.findUnique({
        where: {
          referral_code: referral_code
        }
      });
      if (referralUser) {
        discount_active = true;

        let today = new Date();
        discount_expiry_date = new Date(today.setMonth(today.getMonth() + 3));

        addPoints({userId: referralUser.id, points: 10000}, res);
      }
    }

    // Role : CUSTOMER, ORGANIZER, ADMIN
    const modifiedRole = String(role).toUpperCase();
    console.log(modifiedRole);

    // Membuat user baru di database menggunakan Prisma Client
    const user = await prisma.users.create({
      data: {
        name: fullName, // Properti name harus sesuai dengan schema.prisma
        fullName,
        email,
        password: hashedPassword, // Simpan password yang sudah di-hash
        role: modifiedRole,
        referral_code: generateReferralCode(fullName), // Pastikan ini juga sesuai dengan schema
        discount_active: discount_active, // harus diganti,
        discount_expiry_date: discount_expiry_date
      },
    });

    // Response ketika berhasil
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    // Menangani error
    console.error('Error: ', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Fungsi untuk login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' },
    );

    res.json({ token, role: user.role, name: user.fullName.split(" ")[0], email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
