
const express = require('express');
const auth = require('../middleware/auth');
const { updateProfile, getProfile } = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /api/users/profile:
 *   patch:
 *     summary: Update user profile (height, weight)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               height:
 *                 type: number
 *                 example: 175
 *               weight:
 *                 type: number
 *                 example: 70
 *     responses:
 *       200:
 *         description: Profile updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 height:
 *                   type: number
 *                 weight:
 *                   type: number
 *       400:
 *         description: Height or weight required
 *       404:
 *         description: User not found
 */
router.patch('/profile', auth, updateProfile);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 height:
 *                   type: number
 *                 weight:
 *                   type: number
 *       404:
 *         description: User not found
 */
router.get('/profile', auth, getProfile);

module.exports = router;
