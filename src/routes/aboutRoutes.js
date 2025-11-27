const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', getAbout);

router.put('/', authMiddleware, updateAbout);

module.exports = router;