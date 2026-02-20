const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  tech: [{ type: String }],
  image: { type: String },
  liveUrl: { type: String },
  repoUrl: { type: String },
  category: { type: String, default: 'Other' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
