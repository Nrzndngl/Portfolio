const Skill = require('../models/Skill');
const mongoose = require('mongoose');

const allowedSkillFields = ['category', 'items'];

function allowedBody(body) {
  const result = {};
  for (const key of allowedSkillFields) {
    if (body[key] !== undefined) result[key] = body[key];
  }
  return result;
}

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1 });
    res.json(skills);
  } catch (error) {
    console.error('getSkills error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(allowedBody(req.body));
    res.status(201).json(skill);
  } catch (error) {
    console.error('createSkill error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateSkill = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid skill ID' });
    }
    const skill = await Skill.findByIdAndUpdate(req.params.id, allowedBody(req.body), { new: true, runValidators: true });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (error) {
    console.error('updateSkill error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteSkill = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid skill ID' });
    }
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill removed' });
  } catch (error) {
    console.error('deleteSkill error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };