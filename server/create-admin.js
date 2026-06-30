const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

(async () => {
  try {
    await connectDB();

    const name = process.env.ADMIN_NAME || process.argv[2];
    const email = process.env.ADMIN_EMAIL || process.argv[3];
    const password = process.env.ADMIN_PASSWORD || process.argv[4];

    if (!name || !email || !password || password.length < 6) {
      console.error('Usage: node create-admin.js <name> <email> <password>');
      console.error('   or: ADMIN_NAME=x ADMIN_EMAIL=x ADMIN_PASSWORD=x node create-admin.js');
      console.error('Name, email, and password (min 6 chars) are required');
      process.exit(1);
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.error(`User "${email}" already exists`);
      process.exit(1);
    }

    await User.create({ name, email, password });
    console.log(`Admin user "${email}" created successfully`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
