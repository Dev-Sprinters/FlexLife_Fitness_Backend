
const express = require('express');
const auth = require('../middleware/auth');
const { addToPlan, getTodaysWorkout, getHistory, markCompleted } = require('../controllers/userWorkoutController');
const router = express.Router();

/**
 * @swagger
 * /api/user-workouts:
 *   post:
 *     summary: Add workout to plan
 *     tags: [UserWorkouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workout_id
 *               - scheduled_date
 *             properties:
 *               workout_id:
 *                 type: string
 *               scheduled_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Workout scheduled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWorkout'
 *       400:
 *         description: Validation error
 */
router.post('/', auth, addToPlan);

/**
 * @swagger
 * /api/user-workouts/today:
 *   get:
 *     summary: Get today’s workout
 *     tags: [UserWorkouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Today’s workout or message
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/UserWorkout'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 */
router.get('/today', auth, getTodaysWorkout);

/**
 * @swagger
 * /api/user-workouts/history:
 *   get:
 *     summary: Get workout history
 *     tags: [UserWorkouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserWorkout'
 */
router.get('/history', auth, getHistory);

/**
 * @swagger
 * /api/user-workouts/{id}/complete:
 *   post:
 *     summary: Mark workout as completed
 *     tags: [UserWorkouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UserWorkout ID
 *     responses:
 *       200:
 *         description: Workout marked as completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 completed_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Not found
 */
router.post('/:id/complete', auth, markCompleted);

module.exports = router;