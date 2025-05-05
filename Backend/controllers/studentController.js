const Student = require('../models/Student');

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('class');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add update/delete methods similarly