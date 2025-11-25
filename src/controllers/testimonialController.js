const testimonialService = require('../services/testimonialService');
const logger = require('../utils/logger');

class TestimonialController {
  async getAllTestimonials(req, res, next) {
    try {
      const testimonials = await testimonialService.getAllTestimonials();

      res.status(200).json({
        success: true,
        count: testimonials.length,
        data: testimonials
      });
    } catch (error) {
      logger.error('Get testimonials error:', error);
      next(error);
    }
  }

  async getTestimonialById(req, res, next) {
    try {
      const testimonial = await testimonialService.getTestimonialById(req.params.id);

      res.status(200).json({
        success: true,
        data: testimonial
      });
    } catch (error) {
      logger.error('Get testimonial error:', error);
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async createTestimonial(req, res, next) {
    try {
      const testimonial = await testimonialService.createTestimonial(req.body);

      logger.success('Testimonial created');

      res.status(201).json({
        success: true,
        message: 'Testimonial created successfully',
        data: testimonial
      });
    } catch (error) {
      logger.error('Create testimonial error:', error);
      next(error);
    }
  }

  async updateTestimonial(req, res, next) {
    try {
      const testimonial = await testimonialService.updateTestimonial(
        req.params.id,
        req.body
      );

      logger.success('Testimonial updated');

      res.status(200).json({
        success: true,
        message: 'Testimonial updated successfully',
        data: testimonial
      });
    } catch (error) {
      logger.error('Update testimonial error:', error);
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteTestimonial(req, res, next) {
    try {
      await testimonialService.deleteTestimonial(req.params.id);

      logger.success('Testimonial deleted');

      res.status(200).json({
        success: true,
        message: 'Testimonial deleted successfully'
      });
    } catch (error) {
      logger.error('Delete testimonial error:', error);
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new TestimonialController();