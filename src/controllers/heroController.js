const heroService = require('../services/heroService');
const logger = require('../utils/logger');

class HeroController {
  async getHero(req, res, next) {
    try {
      const hero = await heroService.getHero();

      res.status(200).json({
        success: true,
        data: hero
      });
    } catch (error) {
      logger.error('Get hero error:', error);
      next(error);
    }
  }

  async updateHero(req, res, next) {
    try {
      const hero = await heroService.updateHero(req.body);

      logger.success('Hero section updated');

      res.status(200).json({
        success: true,
        message: 'Hero section updated successfully',
        data: hero
      });
    } catch (error) {
      logger.error('Update hero error:', error);
      next(error);
    }
  }
}

module.exports = new HeroController();