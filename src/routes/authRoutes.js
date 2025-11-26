const express = require('express');
const router = express.Router();
const { login, verifyToken } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public route
router.post('/login', login);

// Protected route
router.get('/verify', authMiddleware, verifyToken);

module.exports = router;