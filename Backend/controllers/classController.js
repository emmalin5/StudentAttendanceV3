const Class = require('../models/Class');
const Subject = require('../models/Subject');

// Create a class
exports.createClass = async (req, res) => {
  try {
    // Validate schedule entries
    const hasInvalidSchedule = req.body.schedule.some(entry => 
      entry.startTime >= entry.endTime
    );
    if (hasInvalidSchedule) {
      return res.status(400).json({ error: 'End time must be after start time' });
    }

    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('schedule.subject') // Populate subjects in schedule
      .populate('students'); // Populate enrolled students
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single class by ID
exports.getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate('schedule.subject')
      .populate('students');
    if (!classData) return res.status(404).json({ error: 'Class not found' });
    res.json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a class by ID
exports.updateClass = async (req, res) => {
  try {
    // Validate schedule entries
    const hasInvalidSchedule = req.body.schedule.some(entry => 
      entry.startTime >= entry.endTime
    );
    if (hasInvalidSchedule) {
      return res.status(400).json({ error: 'End time must be after start time' });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClass) return res.status(404).json({ error: 'Class not found' });
    res.json({ message: 'Class updated successfully', class: updatedClass });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a class by ID
exports.deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) return res.status(404).json({ error: 'Class not found' });
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};