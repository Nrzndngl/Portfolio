const Education = require('../models/Education');
const mongoose = require('mongoose');

const allowedFields = ['institution', 'degree', 'field', 'startDate', 'endDate', 'grade', 'description'];

function allowedBody(body) {
  const result = {};
  for (const key of allowedFields) {
    if (body[key] !== undefined) result[key] = body[key];
  }
  return result;
}

const getEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({ startDate: -1 });
    res.json(educations);
  } catch (error) {
    console.error('getEducations error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createEducation = async (req, res) => {
  try {
    const education = await Education.create(allowedBody(req.body));
    res.status(201).json(education);
  } catch (error) {
    console.error('createEducation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateEducation = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid education ID' });
    }
    const education = await Education.findByIdAndUpdate(req.params.id, allowedBody(req.body), { new: true, runValidators: true });
    if (!education) return res.status(404).json({ message: 'Education not found' });
    res.json(education);
  } catch (error) {
    console.error('updateEducation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteEducation = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid education ID' });
    }
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ message: 'Education not found' });
    res.json({ message: 'Education removed' });
  } catch (error) {
    console.error('deleteEducation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getEducations, createEducation, updateEducation, deleteEducation };