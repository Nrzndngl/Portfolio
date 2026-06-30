const Project = require('../models/Project');
const mongoose = require('mongoose');

const allowedProjectFields = ['title', 'description', 'technologies', 'githubLink', 'liveDemo', 'category', 'featured', 'completionDate', 'images'];

function sanitizeQueryParam(val) {
  if (typeof val === 'string') return val;
  return String(val);
}

function allowedProjectBody(body) {
  const result = {};
  for (const key of allowedProjectFields) {
    if (body[key] !== undefined) result[key] = body[key];
  }
  return result;
}

const getProjects = async (req, res) => {
  try {
    const { technology, category, featured } = req.query;
    let query = {};
    if (technology) query.technologies = { $in: [sanitizeQueryParam(technology)] };
    if (category) query.category = sanitizeQueryParam(category);
    if (featured) query.featured = sanitizeQueryParam(featured) === 'true';
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('getProjects error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProject = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error('getProject error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await Project.create(allowedProjectBody(req.body));
    res.status(201).json(project);
  } catch (error) {
    console.error('createProject error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProject = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    const project = await Project.findByIdAndUpdate(req.params.id, allowedProjectBody(req.body), { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error('updateProject error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project removed' });
  } catch (error) {
    console.error('deleteProject error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };