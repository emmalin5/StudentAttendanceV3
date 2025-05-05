const rateLimit = require('express-rate-limit');

exports.rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Max requests per window
  message: 'Too many requests from this IP, please try again later'
});