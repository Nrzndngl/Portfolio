const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  category: { type: String, required: [true, 'Category is required'], trim: true },
  items: [{
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
