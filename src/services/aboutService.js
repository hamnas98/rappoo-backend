const About = require('../models/About');

class AboutService {
  async getAbout() {
    let about = await About.findOne();
    
    // Create default if doesn't exist
    if (!about) {
      about = await About.create({
        title: 'Maximizing Your Health Potential Together',
        subtitle: 'Smart Nutrition Planning',
        description: 'Your AI-powered health companion transforms the way you approach wellness, making healthy living effortless and personalized.',
      });
    }
    
    return about;
  }

  async updateAbout(data) {
    let about = await About.findOne();
    
    if (!about) {
      about = await About.create(data);
    } else {
      Object.assign(about, data);
      await about.save();
    }
    
    return about;
  }
}

module.exports = new AboutService();