const Certification = require('../models/Certification');

const getCertifications = async (req, res) => {
  const certifications = await Certification.find().sort({ order: 1, createdAt: -1 });
  res.json(certifications);
};

const createCertification = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  const cert = await Certification.create(data);
  res.status(201).json(cert);
};

const updateCertification = async (req, res) => {
  const cert = await Certification.findById(req.params.id);
  if (!cert) return res.status(404).json({ message: 'Certification not found' });
  const data = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  Object.assign(cert, data);
  const updated = await cert.save();
  res.json(updated);
};

const deleteCertification = async (req, res) => {
  const cert = await Certification.findByIdAndDelete(req.params.id);
  if (!cert) return res.status(404).json({ message: 'Certification not found' });
  res.json({ message: 'Certification deleted' });
};

module.exports = { getCertifications, createCertification, updateCertification, deleteCertification };
