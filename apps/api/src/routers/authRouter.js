const express = require('express');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/auth').default;
const prisma = require('../prisma');

const router = express.Router();

// Route untuk Register
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role
            }
        });

        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (err) {
        res.status(400).json({ error: 'User already exists.' });
    }
});

// Route untuk Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const token = generateToken(user);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server error.' });
    }
});

module.exports = router;
