const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { rateLimiter } = require('../middleware/rateLimit');
const { validateSchedule } = require('../middleware/scheduleValidation');
const attendanceController = require('../controllers/attendanceController');

// Mark attendance via fingerprint
router.post(
  '/fingerprint',
  rateLimiter,
  authenticate,
  validateSchedule,
  attendanceController.markFingerprintAttendance
);

// Mark manual attendance
router.post(
  '/manual',
  rateLimiter,
  authenticate,
  validateSchedule,
  attendanceController.markManualAttendance
);

// Get attendance records for a class
router.get(
  '/class/:classId',
  authenticate,
  attendanceController.getClassAttendance
);

// Get attendance by date range
router.get(
  '/date-range',
  authenticate,
  attendanceController.getAttendanceByDateRange
);

// Get attendance history for audit
router.get(
  '/history/:attendanceId',
  authenticate,
  attendanceController.getAttendanceHistory
);

module.exports = router;