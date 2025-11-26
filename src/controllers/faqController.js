const FAQ = require('../models/FAQ');
const logger = require('../utils/logger');

// Get All FAQs
const getAllFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    if(!faqs) {
      logger.warn('no faqs data')
    }

    console.log('faqs data:', faqs);

    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs
    });
  } catch (error) {
    logger.error('Get FAQs error:', error);
    next(error);
  }
};

// Get FAQ By ID
const getFAQById = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
      logger.info('No Fa1 Data');
    }

    res.status(200).json({
      success: true,
      data: faq
    });
  } catch (error) {
    logger.error('Get FAQ error:', error);
    res.status(404).json({
      success: false,
      message: 'FAQ not found'
    });
  }
};

// Create FAQ
const createFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);

    logger.success('FAQ created');

    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      data: faq
    });
  } catch (error) {
    logger.error('Create FAQ error:', error);
    next(error);
  }
};

// Update FAQ
const updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    logger.success('FAQ updated');

    res.status(200).json({
      success: true,
      message: 'FAQ updated successfully',
      data: faq
    });
  } catch (error) {
    logger.error('Update FAQ error:', error);
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Delete FAQ
const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }

    logger.success('FAQ deleted');

    res.status(200).json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    logger.error('Delete FAQ error:', error);
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ
};