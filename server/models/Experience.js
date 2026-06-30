const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: [true, 'Company is required'], trim: true },
  position: { type: String, required: [true, 'Position is required'], trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String, default: '' },
  responsibilities: [{ type: String, trim: true }],
  location: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
