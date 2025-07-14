const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 🟩 Middleware
app.use(cors());
app.use(express.json());

// 🟩 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// 🟩 Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); // Handles: admin login, user login, user registration, get all users

// 🟩 Root route (optional)
app.get('/', (req, res) => {
  res.send('🔥 Daaruwala Backend API is running!');
});

// 🟩 Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});