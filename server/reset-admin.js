require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./src/models/Admin');

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Use Mongoose Query API to update bypassing pre-save hooks
    await Admin.findOneAndUpdate(
      { username },
      { username, password: hashedPassword },
      { upsert: true, new: true }
    );
    
    console.log(`✅ Admin reset/created successfully: ${username}`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

run();
