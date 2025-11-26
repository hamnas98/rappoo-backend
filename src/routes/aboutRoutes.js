const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public route
router.get('/', getAbout);

// Protected route
router.put('/', authMiddleware, updateAbout);

module.exports = router;