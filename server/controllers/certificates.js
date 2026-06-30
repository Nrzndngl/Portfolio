const Certificate = require('../models/Certificate');
const mongoose = require('mongoose');

const allowedFields = ['title', 'organization', 'issueDate', 'credentialId', 'credentialUrl', 'image'];

function allowedBody(body) {
  const result = {};
  for (const key of allowedFields) {
    if (body[key] !== undefined) result[key] = body[key];
  }
  return result;
}

const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.json(certificates);
  } catch (error) {
    console.error('getCertificates error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(allowedBody(req.body));
    res.status(201).json(certificate);
  } catch (error) {
    console.error('createCertificate error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCertificate = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid certificate ID' });
    }
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, allowedBody(req.body), { new: true, runValidators: true });
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json(certificate);
  } catch (error) {
    console.error('updateCertificate error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid certificate ID' });
    }
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json({ message: 'Certificate removed' });
  } catch (error) {
    console.error('deleteCertificate error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };