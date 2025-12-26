
const Workout = require('../models/Workout');
const Exercise = require('../models/Exercise');

// Get all workouts
async function getAllWorkouts(_req, res) {
  const workouts = await Workout.find();
  res.json(workouts);
}

// Get workout details (with exercises)
async function getWorkoutDetails(req, res) {
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    return res.status(404).json({ message: 'Workout not found' });
  }
  const exercises = await Exercise.find({ workout_id: workout._id });
  res.json({ ...workout.toObject(), exercises });
}

// Suggest workouts based on user's height and weight (BMI)
const User = require('../models/User');

async function getSuggestedWorkouts(req, res) {
  // Get user data
  const user = await User.findById(req.user.id);
  if (!user || !user.height || !user.weight) {
    return res.status(400).json({ message: 'Height and weight required in user profile' });
  }
  // Calculate BMI
  const heightM = user.height / 100;
  const bmi = user.weight / (heightM * heightM);

  let difficulty;
  if (bmi < 18.5) {
    difficulty = 'Beginner'; // Underweight
  } else if (bmi < 25) {
    difficulty = 'Intermediate'; // Normal
  } else {
    difficulty = 'Low Impact'; // Overweight/Obese
  }

  // Find workouts by difficulty (or fallback to all)
  let workouts = await Workout.find({ difficulty });
  if (workouts.length === 0) {
    workouts = await Workout.find();
  }
  res.json({
    bmi: bmi.toFixed(1),
    difficulty,
    suggested: workouts
  });
}

module.exports = {
  getAllWorkouts,
  getWorkoutDetails,
  getSuggestedWorkouts
};
