const NewTeacher = require('../models/NewTeacher');

// Create a new teacher
exports.createTeacher = async (req, res) => {
  try {
    const { 
      name, 
      employeeId, 
      email, 
      phone, 
      address, 
      subjects, 
      classes, 
      qualifications, 
      hireDate, 
      status, 
      profilePicture 
    } = req.body;

    // Validate required fields
    if (!name || !employeeId || !email) {
      return res.status(400).json({ error: 'Name, Employee ID, and Email are required fields.' });
    }

    // Create a new teacher instance
    const teacher = new NewTeacher({
      name,
      employeeId,
      email,
      phone,
      address,
      subjects,
      classes,
      qualifications,
      hireDate: hireDate ? new Date(hireDate) : undefined,
      status: status || 'active', // Default to 'active' if not provided
      profilePicture: profilePicture || 'default-profile-picture.jpg'
    });

    // Save the teacher to the database
    await teacher.save();
    res.status(201).json({ message: 'Teacher created successfully', teacher });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await NewTeacher.find()
      .populate('subjects')
      .populate('classes')
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await NewTeacher.findById(req.params.id)
      .populate('subjects')
      .populate('classes')
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a teacher by ID
exports.updateTeacher = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      address, 
      subjects, 
      classes, 
      qualifications, 
      hireDate, 
      status, 
      profilePicture 
    } = req.body;

    // Find and update the teacher
    const teacher = await NewTeacher.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        address,
        subjects,
        classes,
        qualifications,
        hireDate: hireDate ? new Date(hireDate) : undefined,
        status: status || 'active', // Default to 'active' if not provided
        profilePicture: profilePicture || 'default-profile-picture.jpg',
        updatedAt: Date.now() // Ensure updatedAt is updated
      },
      { new: true } // Return the updated document
    );

    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json({ message: 'Teacher updated successfully', teacher });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a teacher by ID
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await NewTeacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};