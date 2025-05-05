// models/Student.js (Updated)
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  fingerprint: { type: String, unique: true },
  attendanceRecord: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  createdBy: String,
  updatedBy: String
});
// Add virtual for attendance percentage
studentSchema.virtual('attendancePercentage').get(async function() {
    const total = await Attendance.countDocuments({ 'students.student': this._id });
    const present = await Attendance.countDocuments({ 
      'students': { $elemMatch: { student: this._id, present: true } } 
    });
    return total ? (present / total) * 100 : 0;
  });

module.exports = mongoose.model('Student', studentSchema);