
const express = require('express');
const auth = require('../middleware/auth');
const { getStats } = require('../controllers/statsController');
const router = express.Router();

/**
 * @swagger
 * /api/user-workouts/stats:
 *   get:
 *     summary: Get user workout statistics
 *     tags: [UserWorkouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_completed:
 *                   type: integer
 *                 completed_this_week:
 *                   type: integer
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       scheduled_date:
 *                         type: string
 *                         format: date
 *                       completed:
 *                         type: boolean
 */
router.get('/stats', auth, getStats);

module.exports = router;