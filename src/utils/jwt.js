const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/env');

const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};