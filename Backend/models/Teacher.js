const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  //role: { type: String, default: 'teacher' },
  createdAt: { type: Date, default: Date.now }
    
});

// Hash password before saving
teacherSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Password verification method
teacherSchema.methods.verifyPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
};

module.exports = mongoose.model('Teacher', teacherSchema);
