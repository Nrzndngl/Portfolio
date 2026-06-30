const dotenv = require('dotenv');
const readline = require('readline');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (q) => new Promise(resolve => rl.question(q, resolve));

(async () => {
  try {
    await connectDB();

    const name = await ask('Admin name: ');
    const email = await ask('Admin email: ');
    const password = await ask('Admin password (min 6 chars): ');

    if (!name || !email || !password || password.length < 6) {
      console.error('Name, valid email, and password (min 6 chars) are required');
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
