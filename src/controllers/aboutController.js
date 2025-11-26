const About = require('../models/About');
const logger = require('../utils/logger');

// Get About
const getAbout = async (req, res, next) => {
  try {
    let about = await About.findOne();
    
    // If no about exists, create one with default values
    if (!about) {
     
      logger.info('No About Data');
    }

    console.log('about data:', about);

    res.status(200).json({
      success: true,
      data: about
    });
  } catch (error) {
    logger.error('Get about error:', error);
    next(error);
  }
};

// Update About
const updateAbout = async (req, res, next) => {
  try {
    const { title, subtitle, description } = req.body;

    let about = await About.findOne();

    if (!about) {
      // Create new if doesn't exist
      about = await About.create(req.body);
    } else {
      // Update existing
      about.title = title || about.title;
      about.subtitle = subtitle || about.subtitle;
      about.description = description || about.description;
      await about.save();
    }

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
};

module.exports = {
  getAbout,
  updateAbout
};