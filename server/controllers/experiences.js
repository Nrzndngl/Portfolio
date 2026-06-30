const Experience = require('../models/Experience');
const mongoose = require('mongoose');

const allowedFields = ['company', 'position', 'startDate', 'endDate', 'current', 'description', 'responsibilities'];

function allowedBody(body) {
  const result = {};
  for (const key of allowedFields) {
    if (body[key] !== undefined) result[key] = body[key];
  }
  return result;
}

const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.json(experiences);
  } catch (error) {
    console.error('getExperiences error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(allowedBody(req.body));
    res.status(201).json(experience);
  } catch (error) {
    console.error('createExperience error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateExperience = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid experience ID' });
    }
    const experience = await Experience.findByIdAndUpdate(req.params.id, allowedBody(req.body), { new: true, runValidators: true });
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json(experience);
  } catch (error) {
    console.error('updateExperience error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteExperience = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid experience ID' });
    }
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience removed' });
  } catch (error) {
    console.error('deleteExperience error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };