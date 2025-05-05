const Attendance = require('../models/Attendance');
const Class = require('../models/Class');
const Teacher = require('../models/Teacher');

exports.markFingerprintAttendance = async (req, res) => {
  try {
    const { classId, subjectId, studentIds } = req.body;
    
    // Verify class and subject exist
    const classDoc = await Class.findById(classId);
    const subjectDoc = await Subject.findById(subjectId);
    if (!classDoc || !subjectDoc) {
      return res.status(404).json({ error: 'Invalid class/subject' });
    }

    // Create attendance record
    const attendance = new Attendance({
      class: classId,
      subject: subjectId,
      markedBy: req.teacher._id,
      students: studentIds.map(id => ({
        student: id,
        present: true, // Fingerprint implies presence
        fingerprintMatched: true
      }))
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.markManualAttendance = async (req, res) => {
  try {
    const { classId, subjectId, students } = req.body;

    const attendance = new Attendance({
      class: classId,
      subject: subjectId,
      markedBy: req.teacher._id,
      students: students.map(student => ({
        student: student.id,
        present: student.present,
        fingerprintMatched: false // Manual entry doesn't use biometrics
      }))
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// controllers/attendanceController.js

// Get attendance records for a class
exports.getClassAttendance = async (req, res) => {
  try {
    const { classId } = req.params;
    const attendance = await Attendance.find({ class: classId })
      .populate('subject')
      .populate('students.student');
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get attendance by date range
exports.getAttendanceByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const attendance = await Attendance.find({
      date: { $gte: startDate, $lte: endDate }
    });
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get attendance history for audit
exports.getAttendanceHistory = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const attendance = await Attendance.findById(attendanceId)
      .populate('history.modifiedBy');
    res.json(attendance.history);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};