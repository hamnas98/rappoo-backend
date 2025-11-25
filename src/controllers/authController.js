const authService = require('../services/authService');
const logger = require('../utils/logger');

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide email and password'
        });
      }

      const result = await authService.login(email, password);

      logger.success(`Admin logged in: ${email}`);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(401).json({
        success: false,
        message: error.message || 'Login failed'
      });
    }
  }

  async verifyToken(req, res) {
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
  }
}

module.exports = new AuthController();