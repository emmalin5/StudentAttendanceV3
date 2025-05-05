const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  fingerprint: { type: mongoose.Schema.Types.ObjectId, ref: 'Fingerprint', required: true },
  date: { type: Date, default: Date.now },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  students: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    present: { type: Boolean, required: true },
    fingerprintMatched: { type: Boolean, default: false }
  }],
  history: [{
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    modifiedAt: { type: Date, default: Date.now },
    changes: { type: Object }
  }]
});

attendanceSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.history.push({
      modifiedBy: this.markedBy,
      changes: this.modifiedPaths().reduce((acc, path) => {
        acc[path] = this.get(path);
        return acc;
      }, {})
    });
  }
  next();
});

// Add indexes for faster queries
attendanceSchema.index({ class: 1, date: -1 });
attendanceSchema.index({ 'students.student': 1 });

// Add validation for uniqueness
attendanceSchema.index({ class: 1, subject: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);