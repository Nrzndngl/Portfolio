const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  organization: { type: String, required: [true, 'Organization is required'], trim: true },
  issueDate: { type: Date, required: true },
  credentialId: { type: String, default: '' },
  credentialUrl: { type: String, default: '' },
  image: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
