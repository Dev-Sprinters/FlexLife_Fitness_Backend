const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String },
  duration: { type: Number }, // in minutes
});

module.exports = mongoose.model('Workout', workoutSchema);