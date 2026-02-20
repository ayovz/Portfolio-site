const Message = require('../models/Message');

const getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
};

const createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'Name, email and message are required' });
  const msg = await Message.create({ name, email, subject, message });
  res.status(201).json({ message: 'Message sent successfully', id: msg._id });
};

const markRead = async (req, res) => {
  const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!msg) return res.status(404).json({ message: 'Message not found' });
  res.json(msg);
};

const deleteMessage = async (req, res) => {
  const msg = await Message.findByIdAndDelete(req.params.id);
  if (!msg) return res.status(404).json({ message: 'Message not found' });
  res.json({ message: 'Message deleted' });
};

module.exports = { getMessages, createMessage, markRead, deleteMessage };
