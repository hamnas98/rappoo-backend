const Testimonial = require('../models/Testimonial');
const logger = require('../utils/logger');

// get
const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    if(!testimonials) {
      logger.warn('no testimonial data')
    }
    console.log('testimonial data :',testimonials)
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    logger.error('Get testimonials error:', error);
    next(error);
  }
};

// get by id
const getTestimonialById = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    logger.error('Get testimonial error:', error);
    res.status(404).json({
      success: false,
      message: 'Testimonial not found'
    });
  }
};

// create
const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);

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
};

// update
const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

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
};

// delete
const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

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
};

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};