// controllers/biometricController.js (New file)
const Student = require('../models/Student');

exports.enrollFingerprint = async (req, res) => {
  try {
    const { studentId, fingerprintData } = req.body;
    const student = await Student.findOneAndUpdate(
      { studentId },
      { fingerprint: fingerprintData },
      { new: true }
    );
    
    res.json({ message: 'Fingerprint enrolled successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyFingerprint = async (req, res) => {
  try {
    const { fingerprintData } = req.body;
    const student = await Student.findOne({ fingerprint: fingerprintData });
    
    if (!student) {
      return res.status(404).json({ message: 'Fingerprint not recognized' });
    }
    
    res.json({ valid: true, student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.requestFingerprintToESP = async (req, res) => {
  const { studentId, action } = req.query;

  if (!studentId || !action) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    // Send request to ESP device
    const response = await axios.get(`http://esp-device-ip/api/fingerprint`, {
      params: { studentId, action }
    });
    
    res.json({
      message: 'Request sent to ESP',
      deviceResponse: response.data
    });
  } catch (error) {
    res.status(500).json({ error: 'ESP communication failed' });
  }
};