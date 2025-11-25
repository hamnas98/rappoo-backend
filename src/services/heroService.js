const Hero = require('../models/Hero');

class HeroService {
  async getHero() {
    let hero = await Hero.findOne();
    

    if (!hero) {
      hero = await Hero.create({
        title: 'Your AI Health Coach',
        subtitle: 'Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs.',
        happyUsersCount: 59182,
      });
    }
    
    return hero;
  }

  async updateHero(data) {
    let hero = await Hero.findOne();
    
    if (!hero) {
      hero = await Hero.create(data);
    } else {
      Object.assign(hero, data);
      await hero.save();
    }
    
    return hero;
  }
}

module.exports = new HeroService();