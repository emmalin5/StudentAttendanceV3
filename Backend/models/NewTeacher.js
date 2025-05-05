const mongoose = require('mongoose');

const newteacherSchema = new mongoose.Schema({
  // Core Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  employeeId: {
    type: String,
    required: [true, 'Employee ID is required'],
    unique: true,
    trim: true,
    validate: {
      validator: (v) => /^[A-Z0-9]{6,10}$/i.test(v),
      message: 'Invalid employee ID format'
    }
  },

  // Contact Information
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\+?[0-9]{10,15}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`
    }
  },

  // Address Information
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zip: { type: String, trim: true },
    country: { type: String, trim: true }
  },

  // Professional Details
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  qualifications: [
    {
      degree: { type: String, trim: true },
      institution: { type: String, trim: true },
      year: { type: Number },
      field: { type: String, trim: true }
    }
  ],
  hireDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on-leave'],
    default: 'active'
  },

  // Profile Picture
  profilePicture: {
    type: String, // URL to cloud storage or local file path
    default: 'default-profile-picture.jpg'
  },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware to update `updatedAt` timestamp
newteacherSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('NewTeacher', newteacherSchema);