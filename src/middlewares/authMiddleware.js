const { verifyAccessToken } = require('../utils/jwt');
const Admin = require('../models/Admin');

const authMiddleware = async (req, res, next) => {
  try {
    // get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No access token provided'
      });
    }

    const accessToken = authHeader.split(' ')[1];
    
    // verify access token
    const decoded = verifyAccessToken(accessToken);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid access token'
      });
    }

      
    const admin = await Admin.findById(decoded.id).select('-password');
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin not found'
      });
    }


    req.user = {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name
    };
    
    next();
  } catch (error) {
   
    if (error.message.includes('expired')) {
      return res.status(401).json({
        success: false,
        message: 'Access token expired',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

module.exports = authMiddleware;