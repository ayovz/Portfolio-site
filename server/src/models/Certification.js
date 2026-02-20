const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String },
  image: { type: String },
  credentialUrl: { type: String },
  category: { type: String, default: 'General' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Certification', certificationSchema);
