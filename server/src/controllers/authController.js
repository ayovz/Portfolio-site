const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check against .env credentials first as the ultimate source of truth
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      let admin = await Admin.findOne({ username });
      // If admin doesn't exist in DB, create it. If password doesn't match DB, update it.
      if (!admin) {
        admin = await Admin.create({ username, password });
      } else {
        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
          const bcrypt = require('bcryptjs');
          const hashedPassword = await bcrypt.hash(password, 12);
          await Admin.updateOne({ _id: admin._id }, { password: hashedPassword });
        }
      }
      return res.json({ token: generateToken(admin._id), username: admin.username });
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
