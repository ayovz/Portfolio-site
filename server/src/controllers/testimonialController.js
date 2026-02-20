const Testimonial = require('../models/Testimonial');

const getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
  res.json(testimonials);
};

const createTestimonial = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.avatar = `/uploads/${req.file.filename}`;
  const t = await Testimonial.create(data);
  res.status(201).json(t);
};

const updateTestimonial = async (req, res) => {
  const t = await Testimonial.findById(req.params.id);
  if (!t) return res.status(404).json({ message: 'Testimonial not found' });
  const data = { ...req.body };
  if (req.file) data.avatar = `/uploads/${req.file.filename}`;
  Object.assign(t, data);
  const updated = await t.save();
  res.json(updated);
};

const deleteTestimonial = async (req, res) => {
  const t = await Testimonial.findByIdAndDelete(req.params.id);
  if (!t) return res.status(404).json({ message: 'Testimonial not found' });
  res.json({ message: 'Testimonial deleted' });
};

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
