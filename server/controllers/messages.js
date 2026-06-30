const ContactMessage = require('../models/ContactMessage');
const mongoose = require('mongoose');

const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('getMessages error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message: msg } = req.body;
    if (!name || !email || !subject || !msg) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    const contactMessage = await ContactMessage.create({ name, email, subject, message: msg });
    res.status(201).json(contactMessage);
  } catch (error) {
    console.error('createMessage error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteMessage = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid message ID' });
    }
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message removed' });
  } catch (error) {
    console.error('deleteMessage error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const markAsRead = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid message ID' });
    }
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (error) {
    console.error('markAsRead error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getMessages, createMessage, deleteMessage, markAsRead };