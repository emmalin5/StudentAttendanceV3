const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Ensure bcrypt is imported
const Teacher = require('../models/Teacher');

exports.login = async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    if (!employeeId || !password) {
      return res.status(400).json({ error: 'Employee ID and password are required' });
    }

    // Find teacher by employeeId
    const teacher = await Teacher.findOne({ employeeId });
    
    if (!teacher) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }


    // Verify password using the method from the model
    //const isMatch = await teacher.verifyPassword(password);

    const isMatch = bcrypt.compare(password, teacher.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { _id: teacher._id, employeeId: teacher.employeeId },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return token and teacher info (excluding password)
    res.json({
      token,
      teacher: {
        _id: teacher._id,
        name: teacher.name,
        employeeId: teacher.employeeId,
        subjects: teacher.subjects,
        classes: teacher.classes,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
