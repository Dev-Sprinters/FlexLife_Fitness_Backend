const User = require('../models/User');

// Update user profile (height, weight)
async function updateProfile(req, res) {
  const { height, weight } = req.body;
  if (height == null && weight == null) {
    return res.status(400).json({ message: 'Height or weight required' });
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (height != null) user.height = height;
    if (weight != null) user.weight = weight;
    await user.save();
    res.json({
      message: 'Profile updated',
      height: user.height,
      weight: user.weight
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

// Get user profile
async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select('name email height weight');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  updateProfile,
  getProfile
};
