const express = require('express');
const heroController = require('../controllers/heroController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// GET /api/content/hero (public)
router.get('/', heroController.getHero);

// PUT /api/content/hero (protected)
router.put('/', authMiddleware, heroController.updateHero);

module.exports = router;