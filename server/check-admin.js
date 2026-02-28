require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const admin = await Admin.findOne({ username: 'admin' });
    if (!admin) {
      console.log('No admin found');
    } else {
      console.log('Admin found:', admin.username);
      const isMatch123 = await admin.matchPassword('admin123');
      const isMatch143 = await admin.matchPassword('admin143');
      console.log('Matches admin123?', isMatch123);
      console.log('Matches admin143?', isMatch143);
      
      // Reset password to admin123 just in case
      admin.password = 'admin123';
      await admin.save();
      console.log('Admin password forcefully reset to admin123');
    }
  } catch (err) {
    console.error('ERROR OCCURRED:', err.message);
  } finally {
    process.exit(0);
  }
};

checkAdmin();
