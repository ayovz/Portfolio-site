const Project = require('../models/Project');

const getProjects = async (req, res) => {
  const { category, featured } = req.query;
  const filter = {};
  if (category && category !== 'All') filter.category = category;
  if (featured !== undefined) filter.featured = featured === 'true';
  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(projects);
};

const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

const createProject = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  if (typeof data.tech === 'string') data.tech = data.tech.split(',').map(t => t.trim());
  const project = await Project.create(data);
  res.status(201).json(project);
};

const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  const data = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  if (typeof data.tech === 'string') data.tech = data.tech.split(',').map(t => t.trim());
  Object.assign(project, data);
  const updated = await project.save();
  res.json(updated);
};

const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project deleted' });
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
