const mongoose = require('mongoose');

const userWorkoutSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workout_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
  scheduled_date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  completed_at: { type: Date }
});

module.exports = mongoose.model('UserWorkout', userWorkoutSchema);