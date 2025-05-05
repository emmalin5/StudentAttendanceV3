const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.post('/', authenticate, studentController.createStudent);
router.get('/', authenticate, studentController.getStudents);
// Add PUT/DELETE routes

module.exports = router;