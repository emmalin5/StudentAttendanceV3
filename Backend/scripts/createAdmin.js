// scripts/createAdmin.js
const mongoose = require('mongoose');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/school_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Teacher.findOne({ employeeId: 'ADMIN-001' });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin);
      await mongoose.connection.close();
      return;
    }

    // Hash password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create new admin user
    const admin = new Teacher({
      name: 'System Admin',
      employeeId: 'ADMIN-001',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('Admin created successfully:', admin);

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the function
createAdmin();
