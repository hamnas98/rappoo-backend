const Admin = require('../models/Admin');
const { generateToken } = require('../utils/jwt');

class AuthService {
  async login(email, password) {
    // Find admin with password field
    const admin = await Admin.findOne({ email }).select('+password');
    
    if (!admin) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = generateToken({
      id: admin._id,
      email: admin.email,
      role: admin.role
    });

    return {
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    };
  }
}

module.exports = new AuthService();