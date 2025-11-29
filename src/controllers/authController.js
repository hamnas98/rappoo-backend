const Admin = require('../models/Admin');
const RefreshToken = require('../models/RefreshToken');
const { 
  generateAccessToken, 
  generateRefreshToken, 
  hashToken,
  verifyAccessToken 
} = require('../utils/jwt');
const logger = require('../utils/logger');

// Helper: Create and save refresh token
const createRefreshToken = async (adminId, req) => {
  const refreshToken = generateRefreshToken();
  const hashedToken = hashToken(refreshToken);
  
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
  
  await RefreshToken.create({
    token: hashedToken,
    admin: adminId,
    expiresAt,
    deviceInfo: req.headers['user-agent'] || null,
    ipAddress: req.ip || req.connection.remoteAddress || null,
    userAgent: req.headers['user-agent'] || null
  });
  
  return refreshToken;
};

// Helper: Set refresh token cookie
const setRefreshTokenCookie = (res, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,  // Not accessible via JavaScript
    secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
    sameSite: 'strict',  // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days in milliseconds
    path: '/'
  };
  
  res.cookie('refreshToken', refreshToken, cookieOptions);
};

// Helper: Clear refresh token cookie
const clearRefreshTokenCookie = (res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find admin
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      logger.error('Admin not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      logger.error('Invalid password for:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(admin._id.toString());
    const refreshToken = await createRefreshToken(admin._id, req);

    // Set refresh token in httpOnly cookie
    setRefreshTokenCookie(res, refreshToken);

    // Admin data (without password)
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
        accessToken,  // Sent in response body (stored in memory)
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

// REFRESH TOKEN
const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token provided'
      });
    }

    // Hash the token to compare with database
    const hashedToken = hashToken(refreshToken);

    // Find token in database
    const storedToken = await RefreshToken.findOne({ 
      token: hashedToken 
    }).populate('admin', '-password');

    if (!storedToken) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Check if token is valid
    if (!storedToken.isValid()) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({
        success: false,
        message: 'Refresh token expired or revoked'
      });
    }

    // TOKEN ROTATION: Revoke old token
    storedToken.isRevoked = true;
    await storedToken.save();

    // Generate new tokens
    const newAccessToken = generateAccessToken(storedToken.admin._id.toString());
    const newRefreshToken = await createRefreshToken(storedToken.admin._id, req);

    // Set new refresh token cookie
    setRefreshTokenCookie(res, newRefreshToken);

    logger.success(`Token refreshed for admin: ${storedToken.admin.email}`);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
        user: {
          _id: storedToken.admin._id,
          email: storedToken.admin.email,
          name: storedToken.admin.name
        }
      }
    });
  } catch (error) {
    logger.error('Token refresh error:', error);
    clearRefreshTokenCookie(res);
    res.status(401).json({
      success: false,
      message: 'Token refresh failed'
    });
  }
};

// LOGOUT
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const hashedToken = hashToken(refreshToken);
      
      // Revoke token in database
      await RefreshToken.findOneAndUpdate(
        { token: hashedToken },
        { isRevoked: true }
      );
    }

    // Clear cookie
    clearRefreshTokenCookie(res);

    logger.success('Admin logged out');

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    clearRefreshTokenCookie(res);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
};

// LOGOUT FROM ALL DEVICES
const logoutAll = async (req, res) => {
  try {
    const adminId = req.user.id;

    // Revoke all refresh tokens for this admin
    await RefreshToken.updateMany(
      { admin: adminId, isRevoked: false },
      { isRevoked: true }
    );

    // Clear cookie
    clearRefreshTokenCookie(res);

    logger.success(`Admin logged out from all devices: ${adminId}`);

    res.status(200).json({
      success: true,
      message: 'Logged out from all devices'
    });
  } catch (error) {
    logger.error('Logout all error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout from all devices failed'
    });
  }
};

// VERIFY ACCESS TOKEN (for protected routes)
const verifyToken = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Token is valid',
      data: {
        user: {
          _id: admin._id,
          email: admin.email,
          name: admin.name
        }
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
  refresh,
  logout,
  logoutAll,
  verifyToken
};