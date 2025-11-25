const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');
const { adminEmail, adminPassword, adminName } = require('../config/env');
const logger = require('../utils/logger');

const createAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      logger.warn('Admin user already exists');
      process.exit(0);
    }

    // Create admin
    const admin = await Admin.create({
      email: adminEmail,
      password: adminPassword,
      name: adminName
    });

    logger.success(`Admin created successfully: ${admin.email}`);
    logger.info(`Email: ${adminEmail}`);
    logger.info(`Password: ${adminPassword}`);

    process.exit(0);
  } catch (error) {
    logger.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();