const express = require('express');
const router = express.Router();
const { login, register, userLogin } = require('../controllers/authController');
const User = require('../models/User');

// 👉 POST /api/auth/login (Admin login)
router.post('/login', login);

// 👉 POST /api/auth/register (User registration)
router.post('/register', register);

// 👉 POST /api/auth/user-login (User login)
router.post('/user-login', userLogin);

// 👉 GET /api/auth/users (for admin to see all users)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;