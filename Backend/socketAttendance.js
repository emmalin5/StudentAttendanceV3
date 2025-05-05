const WebSocket = require('ws');
const mongoose = require('mongoose');

// Import the Attendance model
const Attendance = require('./models/Attendance'); // Adjust the path as needed

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/school', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

// Create a WebSocket server on the specified IP and port
const wss = new WebSocket.Server({ host: '192.168.1.7', port: 3000 });

console.log('WebSocket server is running on ws://192.168.1.7:3000');

wss.on('connection', (ws) => {
    console.log('A new client connected.');

    // Send a welcome message to the client
    ws.send('Welcome to the WebSocket server!');

    // Listen for messages from the client
    ws.on('message', async (message) => {
        console.log(`Received message: ${message}`);

        try {
            // Parse the incoming message
            const data = JSON.parse(message);

            // Ensure the message contains a fingerprint_id
            if (!data.fingerprint_id) {
                ws.send('Invalid message format. Expected "fingerprint_id".');
                return;
            }

            const { fingerprint_id } = data;

            // Find the student by fingerprint_id (assuming you have a Student model)
            const Student = require('./models/Student'); // Adjust the path as needed
            const student = await Student.findOne({ fingerprint_id });

            if (!student) {
                ws.send(`No student found with fingerprint_id: ${fingerprint_id}`);
                return;
            }

            // Find or create an attendance record for the current class and subject
            const classId = 'CLASS_ID'; // Replace with actual class ID
            const subjectId = 'SUBJECT_ID'; // Replace with actual subject ID
            const teacherId = 'TEACHER_ID'; // Replace with actual teacher ID

            let attendance = await Attendance.findOne({
                class: classId,
                subject: subjectId,
                date: new Date().toISOString().split('T')[0], // Today's date
            });

            if (!attendance) {
                // Create a new attendance record if it doesn't exist
                attendance = new Attendance({
                    class: classId,
                    subject: subjectId,
                    markedBy: teacherId,
                    students: [],
                });
            }

            // Check if the student is already marked in this attendance
            const studentRecord = attendance.students.find(s => s.student.toString() === student._id.toString());

            if (studentRecord) {
                // Update the student's attendance if not already marked as present
                if (!studentRecord.present) {
                    studentRecord.present = true;
                    studentRecord.fingerprintMatched = true;
                    await attendance.save();
                    ws.send(`Student ${student.name} marked as present.`);
                } else {
                    ws.send(`Student ${student.name} is already marked as present.`);
                }
            } else {
                // Add the student to the attendance record
                attendance.students.push({
                    student: student._id,
                    present: true,
                    fingerprintMatched: true,
                });
                await attendance.save();
                ws.send(`Student ${student.name} added and marked as present.`);
            }
        } catch (error) {
            console.error('Error processing message:', error);
            ws.send('An error occurred while processing the request.');
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('A client disconnected.');
    });
});