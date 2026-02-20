const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Your Name' },
  tagline: { type: String, default: 'Full Stack Developer' },
  bio: { type: String, default: 'A passionate developer building amazing things.' },
  avatar: { type: String },
  resumeUrl: { type: String },
  email: { type: String },
  socials: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    website: { type: String },
  },
  skills: [{ name: String, level: Number }],
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
