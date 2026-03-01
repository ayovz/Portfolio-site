const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check against .env credentials first as the ultimate permanent source of truth
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      return res.json({ token: generateToken('admin_env_bypass'), username: process.env.ADMIN_USERNAME });
    }

    // Normal DB check
    const admin = await Admin.findOne({ username });
    if (admin && (await admin.matchPassword(password))) {
      res.json({ token: generateToken(admin._id), username: admin.username });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Database connection failed. Please check your MongoDB IP whitelist or connection string.' });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  res.json({ username: req.admin.username, _id: req.admin._id });
};

module.exports = { login, getMe };
