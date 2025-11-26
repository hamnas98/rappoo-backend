const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateToken = (userId) => {
  const secret = env.jwtSecret;  // Changed from JWT_SECRET to jwtSecret
  const expire = env.jwtExpire;  // Changed from JWT_EXPIRE to jwtExpire

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    { id: userId },
    secret,
    { expiresIn: expire }
  );
};

const verifyToken = (token) => {
  try {
    const secret = env.jwtSecret;  // Changed from JWT_SECRET to jwtSecret
    
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};