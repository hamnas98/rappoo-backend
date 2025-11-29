const express = require('express');
const router = express.Router();
const { login, refresh, logout, logoutAll, verifyToken } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);  

// Protected routes
router.get('/verify', authMiddleware, verifyToken);
router.post('/logout-all', authMiddleware, logoutAll);  

module.exports = router;