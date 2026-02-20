const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/login
const login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin && (await admin.matchPassword(password))) {
    res.json({ token: generateToken(admin._id), username: admin.username });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  res.json({ username: req.admin.username, _id: req.admin._id });
};

module.exports = { login, getMe };
