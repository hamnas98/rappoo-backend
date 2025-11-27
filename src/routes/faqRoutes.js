const express = require('express');
const router = express.Router();
const {
  getAllFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ
} = require('../controllers/faqController');
const authMiddleware = require('../middlewares/authMiddleware');

// public
router.get('/', getAllFAQs);
router.get('/:id', getFAQById);

// protected (admin)
router.post('/', authMiddleware, createFAQ);
router.put('/:id', authMiddleware, updateFAQ);
router.delete('/:id', authMiddleware, deleteFAQ);

module.exports = router;