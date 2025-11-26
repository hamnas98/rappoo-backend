const Hero = require('../models/Hero');
const logger = require('../utils/logger');

// Get Hero
const getHero = async (req, res, next) => {
  try {
    let hero = await Hero.findOne();
    
    // If no hero exists
    if (!hero) {
      
      logger.info('No hero Data');
    }

    console.log('hero data:', hero);

    res.status(200).json({
      success: true,
      data: hero
    });
  } catch (error) {
    logger.error('Get hero error:', error);
    next(error);
  }
};

// Update Hero
const updateHero = async (req, res, next) => {
  try {
    const { title, subtitle, happyUsersCount } = req.body;

    let hero = await Hero.findOne();

    if (!hero) {
      // Create new if doesn't exist
      hero = await Hero.create(req.body);
    } else {
      // Update existing
      hero.title = title || hero.title;
      hero.subtitle = subtitle || hero.subtitle;
      hero.happyUsersCount = happyUsersCount || hero.happyUsersCount;
      await hero.save();
    }

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
};

module.exports = {
  getHero,
  updateHero
};