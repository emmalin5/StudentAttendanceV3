const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Subject name is required'],
    trim: true
  },
  code: { 
    type: String, 
    required: [true, 'Subject code is required'], 
    unique: true,
    trim: true,
    uppercase: true
  },
  credits: { 
    type: Number, 
    default: 3,
    min: [1, 'Credits must be at least 1']
  },
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewTeacher',
    validate: {
      validator: (teachers) => teachers.length > 0,
      message: 'A subject must have at least one teacher'
    }
  }]
});

// Calculate student count (async-safe method)
subjectSchema.methods.getStudentCount = async function() {
  const Class = mongoose.model('Class');
  const Student = mongoose.model('Student');
  const classes = await Class.find({ subjects: this._id });
  return Student.countDocuments({ class: { $in: classes } });
};

module.exports = mongoose.model('Subject', subjectSchema);