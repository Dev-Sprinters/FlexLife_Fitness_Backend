
const UserWorkout = require('../models/UserWorkout');

// Get user workout statistics
async function getStats(req, res) {
  const total_completed = await UserWorkout.countDocuments({ user_id: req.user.id, completed: true });
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const completed_this_week = await UserWorkout.countDocuments({ user_id: req.user.id, completed: true, completed_at: { $gte: weekAgo } });
  const history = await UserWorkout.find({ user_id: req.user.id }).select('scheduled_date completed');
  res.json({ total_completed, completed_this_week, history });
}

module.exports = {
  getStats
};
