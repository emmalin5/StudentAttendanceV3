const Subject = require('../models/Subject');
const Class = require('../models/Class');
const Student = require('../models/Student');

// Create a subject
exports.createSubject = async (req, res) => {
  try {
    const { name, code, credits, teachers } = req.body;
    const subject = new Subject({ name, code, credits, teachers });
    await subject.save();
    res.status(201).json({ message: 'Subject created successfully', subject });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all subjects with student counts
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('teachers');
    // Add student count to each subject
    const subjectsWithCounts = await Promise.all(subjects.map(async (subject) => {
      const studentCount = await subject.getStudentCount();
      return { ...subject.toObject(), studentCount };
    }));
    res.json(subjectsWithCounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate('teachers');
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    // Add student count
    const studentCount = await subject.getStudentCount();
    res.json({ ...subject.toObject(), studentCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a subject by ID
exports.updateSubject = async (req, res) => {
  try {
    const { name, code, credits, teachers } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, code, credits, teachers },
      { new: true }
    );
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json({ message: 'Subject updated successfully', subject });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a subject by ID
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json({ message: 'Subject deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};