const Admin = require('../models/Admin');
const { generateToken } = require('../utils/jwt');
const logger = require('../utils/logger');

// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // find admi 
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      logger.error('Admin not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // check password
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      logger.error('Invalid password for:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // genereate token
    const token = generateToken(admin._id.toString());

    // response
    const adminData = {
      _id: admin._id,
      email: admin.email,
      name: admin.name
    };

    logger.success(`Admin logged in: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: adminData
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};

// Verify Token
const verifyToken = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Token is valid',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token verification failed'
    });
  }
};

module.exports = {
  login,
  verifyToken
};