const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  workout_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
  name: { type: String, required: true },
  description: { type: String }, // general description
  steps: { type: [String] }, // array of step-by-step instructions
  sets: { type: Number, required: true },
  reps: { type: Number }, // optional
  duration: { type: Number } // optional, in seconds
});

module.exports = mongoose.model('Exercise', exerciseSchema);