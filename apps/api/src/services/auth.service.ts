import { Request, Response } from 'express';
import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Fungsi untuk register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, fullName, email, password, role, referralCode } = req.body;

    // Hash password menggunakan bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Membuat user baru di database menggunakan Prisma Client
    const user = await prisma.users.create({
      data: {
        name, // Properti name harus sesuai dengan schema.prisma
        fullName,
        email,
        password: hashedPassword, // Simpan password yang sudah di-hash
        role,
        referral_code: referralCode, // Pastikan ini juga sesuai dengan schema
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

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
