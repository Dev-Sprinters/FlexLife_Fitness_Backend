
const UserWorkout = require('../models/UserWorkout');

// Add a workout to the user's plan
async function addToPlan(req, res) {
  const { workout_id, scheduled_date } = req.body;
  if (!workout_id || !scheduled_date) {
    return res.status(400).json({ message: 'workout_id and scheduled_date required' });
  }
  try {
    const userWorkout = await UserWorkout.create({
      user_id: req.user.id,
      workout_id,
      scheduled_date,
      completed: false
    });
    res.json(userWorkout);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

// Get today's workout for the user
async function getTodaysWorkout(req, res) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const userWorkout = await UserWorkout.findOne({
    user_id: req.user.id,
    scheduled_date: today,
    completed: false
  }).populate('workout_id');
  if (!userWorkout) {
    return res.json({ message: 'No workout scheduled today' });
  }
  res.json({
    id: userWorkout._id,
    workout: userWorkout.workout_id,
    scheduled_date: userWorkout.scheduled_date,
    completed: userWorkout.completed
  });
}

// Get the user's workout history
async function getHistory(req, res) {
  const userWorkouts = await UserWorkout.find({ user_id: req.user.id }).populate('workout_id');
  res.json(userWorkouts.map(uw => ({
    id: uw._id,
    workout: uw.workout_id,
    scheduled_date: uw.scheduled_date,
    completed: uw.completed,
    completed_at: uw.completed_at
  })));
}

// Mark a workout as completed
async function markCompleted(req, res) {
  const userWorkout = await UserWorkout.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!userWorkout) {
    return res.status(404).json({ message: 'Not found' });
  }
  if (userWorkout.completed) {
    return res.json({ success: true, completed_at: userWorkout.completed_at });
  }
  userWorkout.completed = true;
  userWorkout.completed_at = new Date();
  await userWorkout.save();
  res.json({ success: true, completed_at: userWorkout.completed_at });
}

module.exports = {
  addToPlan,
  getTodaysWorkout,
  getHistory,
  markCompleted
};
