const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

const User = require("./models/User");
const Profile = require("./models/Profile");
const Skill = require("./models/Skill");
const Experience = require("./models/Experience");
const Education = require("./models/Education");
const Certificate = require("./models/Certificate");
const Project = require("./models/Project");

const seedData = async () => {
  try {
    // Wait for MongoDB connection
    await connectDB();

    console.log("Connected. Seeding database...");

    await User.deleteMany();
    await Profile.deleteMany();
    await Skill.deleteMany();
    await Experience.deleteMany();
    await Education.deleteMany();
    await Certificate.deleteMany();
    await Project.deleteMany();

    // ... all your create() calls stay exactly the same ...

    console.log("Seed data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();