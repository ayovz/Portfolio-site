const Profile = require('../models/Profile');

const getProfile = async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});
  res.json(profile);
};

const updateProfile = async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) profile = new Profile();
  const data = { ...req.body };
  if (req.file) data.avatar = `/uploads/${req.file.filename}`;
  if (typeof data.skills === 'string') data.skills = JSON.parse(data.skills);
  if (typeof data.socials === 'string') data.socials = JSON.parse(data.socials);
  Object.assign(profile, data);
  const updated = await profile.save();
  res.json(updated);
};

module.exports = { getProfile, updateProfile };
