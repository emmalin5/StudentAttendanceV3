const express = require('express');
const router = express.Router();
const newTeacherController = require('../controllers/newTeacherController');

// CRUD Routes
router.post('/', newTeacherController.createTeacher); // Create
router.get('/', newTeacherController.getTeachers);   // Read All
router.get('/:id', newTeacherController.getTeacherById); // Read One
router.put('/:id', newTeacherController.updateTeacher);  // Update
router.delete('/:id', newTeacherController.deleteTeacher); // Delete

module.exports = router;