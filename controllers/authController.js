const Admin = require('../models/Admin');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 🟩 Admin Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Simulate token (You can return JWT later)
    const token = 'daaruwala-admin-token';

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: { email: admin.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// 🟦 User Registration
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone });
    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// 🟦 User Login
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // Simulate token (You can return JWT later)
    const token = 'daaruwala-user-token';

    // ✅ THIS IS THE FIX: Send back the user's _id
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id, // <-- THIS LINE WAS MISSING
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = {
  login,        // Admin login
  register,     // User registration
  userLogin     // User login
};