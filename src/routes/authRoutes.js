const express = require('express');
const router = express.Router();
const { login, refresh, logout, logoutAll, verifyToken } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// public routes
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);  

// protected routes - admin
router.get('/verify', authMiddleware, verifyToken);
router.post('/logout-all', authMiddleware, logoutAll);  

module.exports = router;