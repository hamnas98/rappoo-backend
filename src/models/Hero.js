const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  happyUsersCount: {
    type: Number,
    default: 59182
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

heroSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Hero', heroSchema);