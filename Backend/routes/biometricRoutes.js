// routes/biometricRoutes.js (New file)
const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const biometricController = require('../controllers/biometricController');

const router = express.Router();

// Fingerprint enrollment endpoint
router.post('/enroll', authenticate, biometricController.enrollFingerprint);

// Fingerprint verification endpoint
router.post('/verify', authenticate, biometricController.verifyFingerprint);

// ESP communication endpoint
router.get('/requestfingerprintToESP', biometricController.requestFingerprintToESP);

module.exports = router;