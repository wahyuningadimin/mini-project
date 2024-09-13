import App from './app';  
import prisma from './prismaClient';  // Koneksi prisma
import { authRoutes } from './controllers/auth.controller';  // Mengimpor authRoutes

const main = async () => {
  try {
    // Inisialisasi database
    console.log('Connecting to the database...');
    await prisma.$connect();  // Koneksi Prisma ke database

    const app = new App();  // Membuat instance dari kelas 'App'

    app.app.use('/auth', authRoutes);  // Menambahkan rute auth ke aplikasi

    app.start();  // Memulai aplikasi
  } catch (error) {
    console.error('Error during startup:', error);
    process.exit(1);  // Keluar dari proses jika terjadi error
  }
};

main();
