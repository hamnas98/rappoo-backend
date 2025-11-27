const express = require('express');
const router = express.Router();
const { getHero, updateHero } = require('../controllers/heroController');
const authMiddleware = require('../middlewares/authMiddleware');

// public
router.get('/', getHero);

// protected (admin)
router.put('/', authMiddleware, updateHero);

module.exports = router;