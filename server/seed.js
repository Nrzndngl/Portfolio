const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require('bcryptjs');
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

    await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
    });

    await Profile.create({
      name: 'Niranjan Dangol',
      title: 'Full Stack Developer',
      bio: 'A passionate developer building amazing things with modern technologies.',
      location: 'New York, USA',
      email: 'hello@example.com',
      socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
    });

    await Skill.create({ category: 'Frontend', items: [{ name: 'React', level: 90 }, { name: 'JavaScript', level: 85 }, { name: 'Tailwind CSS', level: 80 }] });
    await Skill.create({ category: 'Backend', items: [{ name: 'Node.js', level: 85 }, { name: 'Express', level: 80 }, { name: 'MongoDB', level: 75 }] });

    await Experience.create({ company: 'Tech Corp', position: 'Senior Developer', startDate: new Date('2022-01'), current: true, description: 'Leading development of web applications.', responsibilities: ['Architect solutions', 'Code reviews', 'Mentor juniors'] });
    await Experience.create({ company: 'Startup Inc', position: 'Full Stack Developer', startDate: new Date('2020-03'), endDate: new Date('2021-12'), description: 'Built and maintained web applications.' });

    await Education.create({ institution: 'University of Technology', degree: 'B.S.', field: 'Computer Science', startDate: new Date('2016-09'), endDate: new Date('2020-06'), grade: '3.8 GPA' });

    await Certificate.create({ title: 'AWS Certified Developer', organization: 'Amazon Web Services', issueDate: new Date('2023-06'), credentialUrl: 'https://aws.amazon.com/certification' });

    await Project.create({
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with React and Node.js.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'Full Stack',
      featured: true,
      githubLink: 'https://github.com',
      liveDemo: 'https://example.com',
    });

    console.log("Seed data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();