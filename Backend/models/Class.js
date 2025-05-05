const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Class name is required'], 
    unique: true,
    trim: true
  },
  schedule: [{
    dayOfWeek: { 
      type: Number, 
      required: [true, 'Day of week is required'],
      min: [0, 'Day must be between 0 (Sunday) and 6 (Saturday)'],
      max: [6, 'Day must be between 0 (Sunday) and 6 (Saturday)'],
    },
    startTime: { 
      type: String, 
      required: [true, 'Start time is required'],
      validate: {
        validator: (v) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v),
        message: 'Invalid time format (must be HH:MM)'
      }
    },
    endTime: { 
      type: String, 
      required: [true, 'End time is required'],
      validate: {
        validator: (v) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v),
        message: 'Invalid time format (must be HH:MM)'
      }
    },
    subject: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Subject',
      required: [true, 'Subject is required']
    }
  }],
  students: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student' 
  }],
  createdAt: { type: Date, default: Date.now }
});

// Virtual for student count
classSchema.virtual('studentCount').get(function() {
  return this.students.length;
});

// Enable virtuals in JSON output
classSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Class', classSchema);