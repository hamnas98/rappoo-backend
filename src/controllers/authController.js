const Admin = require('../models/Admin');
const RefreshToken = require('../models/RefreshToken');
const { 
  generateAccessToken, 
  generateRefreshToken, 
  hashToken,
  verifyAccessToken 
} = require('../utils/jwt');
const logger = require('../utils/logger');

// toke  creation
const createRefreshToken = async (adminId, req) => {
  const refreshToken = generateRefreshToken();
  const hashedToken = hashToken(refreshToken);
  
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); 
  
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

// st cookie
const setRefreshTokenCookie = (res, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,  
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict',  
    maxAge: 7 * 24 * 60 * 60 * 1000,  
    path: '/'
  };
  
  res.cookie('refreshToken', refreshToken, cookieOptions);
};

// cler token
const clearRefreshTokenCookie = (res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

      
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      logger.error('Admin not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }


    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      logger.error('Invalid password for:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // generate tokens
    const accessToken = generateAccessToken(admin._id.toString());
    const refreshToken = await createRefreshToken(admin._id, req);

    
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
        accessToken,  
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


// create new token refresh ageter expirey
const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token provided'
      });
    }

  
    const hashedToken = hashToken(refreshToken);

      
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

    
    if (!storedToken.isValid()) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({
        success: false,
        message: 'Refresh token expired or revoked'
      });
    }
    storedToken.isRevoked = true;
    await storedToken.save();

    const newAccessToken = generateAccessToken(storedToken.admin._id.toString());
    const newRefreshToken = await createRefreshToken(storedToken.admin._id, req);


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
      
     
      await RefreshToken.findOneAndUpdate(
        { token: hashedToken },
        { isRevoked: true }
      );
    }

      
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


const logoutAll = async (req, res) => {
  try {
    const adminId = req.user.id;

    await RefreshToken.updateMany(
      { admin: adminId, isRevoked: false },
      { isRevoked: true }
    );

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