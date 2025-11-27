const About = require('../models/About');
const logger = require('../utils/logger');

// get 
const getAbout = async (req, res, next) => {
  try {
    let about = await About.findOne();
    
    
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

// update count
const updateAbout = async (req, res, next) => {
  try {
    const { title, subtitle, description } = req.body;

    let about = await About.findOne();

    if (!about) {
      // creating
      about = await About.create(req.body);
    } else {

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