// routes/teacherRoutes.js
const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

// @route   GET /api/teachers
// @desc    Get all teachers
router.get('/', authenticate, teacherController.getAllTeachers);

// @route   GET /api/teachers/:id
// @desc    Get teacher by ID
router.get('/:id', authenticate, teacherController.getTeacherById);

// @route   POST /api/teachers
// @desc    Create new teacher
router.post('/', authenticate, teacherController.createTeacher);

// @route   PUT /api/teachers/:id
// @desc    Update teacher
router.put('/:id', authenticate, teacherController.updateTeacher);

// @route   DELETE /api/teachers/:id
// @desc    Delete teacher
router.delete('/:id', authenticate, teacherController.deleteTeacher);

module.exports = router;