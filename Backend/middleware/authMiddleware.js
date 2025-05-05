const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await Teacher.findById(decoded._id);
    
    if (!teacher) throw new Error('Authentication failed');
    
    req.teacher = teacher;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};