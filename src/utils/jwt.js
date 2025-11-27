const jwt = require('jsonwebtoken');
const env = require('../config/env');

// token generation
const generateToken = (userId) => {
  const secret = env.jwtSecret;  
  const expire = env.jwtExpire;  

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    { id: userId },
    secret,
    { expiresIn: expire }
  );
};


// verififcation
const verifyToken = (token) => {
  try {
    const secret = env.jwtSecret;  
    
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