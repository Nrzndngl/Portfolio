const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: [true, 'Institution is required'], trim: true },
  degree: { type: String, required: [true, 'Degree is required'], trim: true },
  field: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  grade: { type: String, default: '' },
  description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
