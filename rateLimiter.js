const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 300, // Limits each IP to 300 requests per window
    standardHeaders: true, // Enable "RateLimit-*" headers
    legacyHeaders: false, // Disable "X-RateLimit-*" headers
});

module.exports = {
    rateLimiter
}