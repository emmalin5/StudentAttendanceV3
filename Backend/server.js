// server.js (Integrated version)
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const cors = require('cors');
const axios = require('axios');

// Routes
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
//const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const biometricRoutes = require('./routes/biometricRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const newteacherRoutes = require('./routes/newteacherRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
//app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/biometric', biometricRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/newteachers', newteacherRoutes);
// Socket.io setup
io.on('connection', (socket) => {
  socket.on('join', (classId) => {
    socket.join(classId);
  });
});

// Serve static files
app.use(express.static('public'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'School Management System API', version: '1.0.0' });
});
const PORT = process.env.PORT || 4000; // Changed from 3000/5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});