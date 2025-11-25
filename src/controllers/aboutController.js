const aboutService = require('../services/aboutService');
const logger = require('../utils/logger');

class AboutController {
  async getAbout(req, res, next) {
    try {
      const about = await aboutService.getAbout();

      res.status(200).json({
        success: true,
        data: about
      });
    } catch (error) {
      logger.error('Get about error:', error);
      next(error);
    }
  }

  async updateAbout(req, res, next) {
    try {
      const about = await aboutService.updateAbout(req.body);

      logger.success('About section updated');

      res.status(200).json({
        success: true,
        message: 'About section updated successfully',
        data: about
      });
    } catch (error) {
      logger.error('Update about error:', error);
      next(error);
    }
  }
}

module.exports = new AboutController();