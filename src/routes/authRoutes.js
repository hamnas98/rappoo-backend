const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/verify (protected)
router.get('/verify', authMiddleware, authController.verifyToken);

module.exports = router;