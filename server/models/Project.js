const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  description: { type: String, required: [true, 'Description is required'] },
  technologies: [{ type: String, trim: true }],
  githubLink: { type: String, default: '' },
  liveDemo: { type: String, default: '' },
  images: [{ type: String }],
  category: { type: String, required: true, trim: true },
  featured: { type: Boolean, default: false },
  completionDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
