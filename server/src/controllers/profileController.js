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
  if (req.file) data.avatar = req.file.path;
  if (typeof data.skills === 'string') data.skills = JSON.parse(data.skills);
  if (typeof data.roles === 'string') data.roles = JSON.parse(data.roles);
  if (typeof data.socials === 'string') data.socials = JSON.parse(data.socials);
  if (typeof data.techStrip === 'string') data.techStrip = JSON.parse(data.techStrip);
  Object.assign(profile, data);
  const updated = await profile.save();
  res.json(updated);
};

module.exports = { getProfile, updateProfile };
