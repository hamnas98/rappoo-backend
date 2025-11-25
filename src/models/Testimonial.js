const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  role: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  testimonial: {
    type: String,
    required: [true, 'Testimonial text is required'],
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

testimonialSchema.index({ order: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);