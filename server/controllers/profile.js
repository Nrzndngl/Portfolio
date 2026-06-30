const Profile = require('../models/Profile');

const allowedProfileFields = ['name', 'title', 'bio', 'avatar', 'resumeUrl', 'location', 'email', 'phone', 'socialLinks', 'aboutImage', 'resumeFileName'];

function allowedBody(body) {
  const result = {};
  for (const key of allowedProfileFields) {
    if (body[key] !== undefined) result[key] = body[key];
  }
  return result;
}

const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        name: 'Your Name',
        title: 'Full Stack Developer',
        bio: 'A passionate developer building amazing things.',
      });
    }
    res.json(profile);
  } catch (error) {
    console.error('getProfile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(allowedBody(req.body));
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, allowedBody(req.body), { new: true, runValidators: true });
    }
    res.json(profile);
  } catch (error) {
    console.error('updateProfile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProfile, updateProfile };