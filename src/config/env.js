const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/rappoo',
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key',
  jwtExpire: process.env.JWT_EXPIRE || '24h',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@rappoo.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin@123',
  adminName: process.env.ADMIN_Name||"Reppo Admin 1"
};