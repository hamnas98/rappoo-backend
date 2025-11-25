const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Hero = require('../models/Hero');
const About = require('../models/About');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const logger = require('../utils/logger');

const seedContent = async () => {
  try {
    await connectDB();

    // Seed Hero
    await Hero.deleteMany({});
    await Hero.create({
      title: 'Your AI Health Coach',
      subtitle: 'Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs.',
      happyUsersCount: 59182,
    });
    logger.success('Hero section seeded');

    // Seed About
    await About.deleteMany({});
    await About.create({
      title: 'Maximizing Your Health Potential Together',
      subtitle: 'Smart Nutrition Planning',
      description: 'Your AI-powered health companion transforms the way you approach wellness, making healthy living effortless and personalized.',
    });
    logger.success('About section seeded');

    // Seed Testimonials
    await Testimonial.deleteMany({});
    const testimonials = [
      {
        name: 'Ava L.',
        role: 'Marketing Executive',
        company: 'AI Wellness Journeys',
        testimonial: "I've tried countless health apps, but none come close to this. The AI truly understands my needs—it suggested daily routines and nutrition tips that actually fit my lifestyle. Within weeks, I felt more energized, slept better, and became more mindful. It's like having a personal wellness coach in my pocket.",
        rating: 5,
        order: 1
      },
      {
        name: 'Namo Serlina',
        role: 'CEO',
        company: 'Delego',
        testimonial: 'This app has completely transformed how I approach my health and wellness. Highly recommended!',
        rating: 5,
        order: 2
      }
    ];
    await Testimonial.insertMany(testimonials);
    logger.success('Testimonials seeded');

    // Seed FAQs
    await FAQ.deleteMany({});
    const faqs = [
      {
        question: 'What features does the AI Health Assistant offer?',
        answer: 'Our AI Health Assistant offers personalized health tracking, nutrition planning, workout recommendations, sleep monitoring, and 24/7 AI-powered health guidance.',
        order: 1
      },
      {
        question: 'Is the app customizable to my needs?',
        answer: 'Yes! The app uses advanced AI to learn your preferences, health goals, and lifestyle to provide completely personalized recommendations.',
        order: 2
      },
      {
        question: 'How accurate is the AI health tracking?',
        answer: 'Experience the future of personalized health and wellness before everyone else. Join our exclusive early access program and help shape the future of AI-powered health coaching.',
        order: 3
      },
      {
        question: 'Do I need any special equipment?',
        answer: 'No special equipment is required. You can use the app with just your smartphone. However, connecting wearable devices can enhance tracking accuracy.',
        order: 4
      },
      {
        question: 'How does the free trial work?',
        answer: 'Get full access to all premium features for 14 days, no credit card required. Cancel anytime during the trial period.',
        order: 5
      }
    ];
    await FAQ.insertMany(faqs);
    logger.success('FAQs seeded');

    logger.success(' All content seeded successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding content:', error);
    process.exit(1);
  }
};

seedContent();