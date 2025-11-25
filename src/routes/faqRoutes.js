const express = require('express');
const faqController = require('../controllers/faqController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// GET /api/content/faq (public)
router.get('/', faqController.getAllFAQs);

// GET /api/content/faq/:id (public)
router.get('/:id', faqController.getFAQById);

// POST /api/content/faq (protected)
router.post('/', authMiddleware, faqController.createFAQ);

// PUT /api/content/faq/:id (protected)
router.put('/:id', authMiddleware, faqController.updateFAQ);

// DELETE /api/content/faq/:id (protected)
router.delete('/:id', authMiddleware, faqController.deleteFAQ);

module.exports = router;