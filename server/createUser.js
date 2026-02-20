/**
 * createUser.js
 * Run this ONCE to create a dedicated MongoDB user for the portfolio DB.
 * Usage: node createUser.js <adminUsername> <adminPassword>
 * Example: node createUser.js admin myAdminPass
 *
 * If your MongoDB has no auth yet on the admin db, just run:
 *   node createUser.js
 */
require('dotenv').config();
const { MongoClient } = require('mongodb');

const [,, adminUser = '', adminPass = ''] = process.argv;

const run = async () => {
  // Connect as admin (with or without creds)
  let adminUri;
  if (adminUser && adminPass) {
    adminUri = `mongodb://${encodeURIComponent(adminUser)}:${encodeURIComponent(adminPass)}@localhost:27017/admin`;
  } else {
    adminUri = 'mongodb://localhost:27017/admin';
  }

  const client = new MongoClient(adminUri);
  try {
    await client.connect();
    console.log('Connected to MongoDB as admin');

    const adminDb = client.db('admin');

    // Check if user already exists
    const existing = await adminDb.command({ usersInfo: { user: 'portfolioUser', db: 'portfolio' } });
    if (existing.users.length > 0) {
      console.log('User portfolioUser already exists, skipping creation.');
    } else {
      await client.db('portfolio').command({
        createUser: 'portfolioUser',
        pwd: 'portfolioPass123',
        roles: [{ role: 'readWrite', db: 'portfolio' }],
      });
      console.log('✅ Created MongoDB user: portfolioUser / portfolioPass123');
    }

    console.log('\nNow update your server/.env:');
    console.log('MONGO_URI=mongodb://portfolioUser:portfolioPass123@localhost:27017/portfolio');

    await client.close();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    console.log('\n--- SOLUTION ---');
    console.log('Your MongoDB may require admin credentials to create users.');
    console.log('Run: node createUser.js <yourAdminUsername> <yourAdminPassword>');
    console.log('Example: node createUser.js admin mypass123');
    console.log('\nOR if you know your MongoDB admin credentials, directly update server/.env:');
    console.log('MONGO_URI=mongodb://adminUser:adminPass@localhost:27017/portfolio?authSource=admin');
    await client.close();
    process.exit(1);
  }
};

run();
