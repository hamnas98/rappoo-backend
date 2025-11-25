const express = require('express');
const testimonialController = require('../controllers/testimonialController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// GET /api/content/testimonials (public)
router.get('/', testimonialController.getAllTestimonials);

// GET /api/content/testimonials/:id (public)
router.get('/:id', testimonialController.getTestimonialById);

// POST /api/content/testimonials (protected)
router.post('/', authMiddleware, testimonialController.createTestimonial);

// PUT /api/content/testimonials/:id (protected)
router.put('/:id', authMiddleware, testimonialController.updateTestimonial);

// DELETE /api/content/testimonials/:id (protected)
router.delete('/:id', authMiddleware, testimonialController.deleteTestimonial);

module.exports = router;