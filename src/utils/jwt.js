const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const env = require('../config/env');
const logger = require('./logger');


const generateAccessToken = (userId) => {
  const secret = env.jwtSecret;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    { id: userId, type: 'access' },
    secret,
    { expiresIn: '15m' } 
  );
};


const generateRefreshToken = () => {

  return crypto.randomBytes(64).toString('hex');
};


const hashToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};

const verifyAccessToken = (token) => {
  try {
    const secret = env.jwtSecret;
    
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, secret);
    logger.info('decoded',  decoded)
    
    if (decoded.type !== 'access') {
      throw new Error('Invalid token type');
    }
    
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  verifyAccessToken
};