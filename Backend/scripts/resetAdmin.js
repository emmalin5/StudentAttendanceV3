// scripts/resetAdminPassword.js
const mongoose = require('mongoose');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');

async function resetPassword() {
  try {
    await mongoose.connect('mongodb://localhost:27017/school_management');

    const admin = await Teacher.findOne({ employeeId: 'ADMIN-001' });
    if (!admin) return console.log('Admin not found');

    // Replace double-hashed password with a properly hashed one
    admin.password = await bcrypt.hash('admin123', 8);
    await admin.save();
    
    console.log('Password reset successfully');
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

resetPassword();