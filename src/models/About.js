const mongoose = require('mongoose');


const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

aboutSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('About', aboutSchema);