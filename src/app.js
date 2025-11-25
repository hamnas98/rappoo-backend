const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const { frontendUrl } = require('./config/env');
const logger = require('./utils/logger');

// Import routes
const authRoutes = require('./routes/authRoutes');
const heroRoutes = require('./routes/heroRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const faqRoutes = require('./routes/faqRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: frontendUrl,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});




// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content/hero', heroRoutes);
app.use('/api/content/about', aboutRoutes);
app.use('/api/content/testimonials', testimonialRoutes);
app.use('/api/content/faq', faqRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


app.use(errorHandler);

module.exports = app;