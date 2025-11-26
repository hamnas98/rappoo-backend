const express = require('express');
const router = express.Router();
const { getHero, updateHero } = require('../controllers/heroController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public route
router.get('/', getHero);

// Protected route
router.put('/', authMiddleware, updateHero);

module.exports = router;