const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const logger = require('../utils/logger');

const createAdmin = async () => {
  try {
    await connectDB();


    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (existingAdmin) {
      logger.info('Admin already exists');
      process.exit(0);
    }

    // create admin
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL || 'admin@rappoo.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      name: process.env.ADMIN_NAME || "Reppoo Admin 1"
    });

    logger.success(`Admin created successfully: ${admin.email}`);
    console.log('Admin ID:', admin._id);
    
    process.exit(0);
  } catch (error) {
    logger.error('Error creating admin:', error);
    console.error(error);
    process.exit(1);
  }
};

createAdmin();