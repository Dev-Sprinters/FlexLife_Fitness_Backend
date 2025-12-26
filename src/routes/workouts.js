
const express = require('express');
const { getAllWorkouts, getWorkoutDetails, getSuggestedWorkouts } = require('../controllers/workoutController');
const auth = require('../middleware/auth');
const router = express.Router();
/**
 * @swagger
 * /api/workouts/suggested:
 *   get:
 *     summary: Suggest workouts based on user height and weight
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Suggested workouts for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bmi:
 *                   type: string
 *                 difficulty:
 *                   type: string
 *                 suggested:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Height and weight required in user profile
 */
router.get('/suggested', auth, getSuggestedWorkouts);

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: List of workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 */
router.get('/', getAllWorkouts);

/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     summary: Get workout details (with exercises)
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID
 *     responses:
 *       200:
 *         description: Workout details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkoutDetails'
 *       404:
 *         description: Workout not found
 */
router.get('/:id', getWorkoutDetails);

module.exports = router;