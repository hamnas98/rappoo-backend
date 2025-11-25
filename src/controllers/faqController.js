const faqService = require('../services/faqService');
const logger = require('../utils/logger');

class FAQController {
  async getAllFAQs(req, res, next) {
    try {
      const faqs = await faqService.getAllFAQs();

      res.status(200).json({
        success: true,
        count: faqs.length,
        data: faqs
      });
    } catch (error) {
      logger.error('Get FAQs error:', error);
      next(error);
    }
  }

  async getFAQById(req, res, next) {
    try {
      const faq = await faqService.getFAQById(req.params.id);

      res.status(200).json({
        success: true,
        data: faq
      });
    } catch (error) {
      logger.error('Get FAQ error:', error);
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async createFAQ(req, res, next) {
    try {
      const faq = await faqService.createFAQ(req.body);

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
  }

  async updateFAQ(req, res, next) {
    try {
      const faq = await faqService.updateFAQ(req.params.id, req.body);

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
  }

  async deleteFAQ(req, res, next) {
    try {
      await faqService.deleteFAQ(req.params.id);

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
  }
}

module.exports = new FAQController();