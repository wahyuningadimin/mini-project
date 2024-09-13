import { sign, verify } from 'jsonwebtoken';

// Buat JWT Token
function generateToken(user) {
    // Gunakan ID pengguna untuk membuat JWT
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role // pastikan `role` ada di data user
    };

    // Buat token dengan masa berlaku 1 hari
    const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

// Middleware untuk verifikasi JWT Token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}

export default {
    generateToken,
    verifyToken
};
