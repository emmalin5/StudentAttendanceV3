const express = require('express');
const { login } = require('../controllers/authController'); // Verify this path
const router = express.Router();

// Add this line to confirm routes are loaded
console.log('Auth routes registered'); 

// Ensure this route exists:
router.post('/login', login);
router.get('/test', (req, res) => {
    res.send('Auth routes are working');
  });
module.exports = router;