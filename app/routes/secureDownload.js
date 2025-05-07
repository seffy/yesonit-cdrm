const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Middleware to check if user is logged in
function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.status(401).send('Unauthorized: Please log in to access this file.');
    }
}

// Download route
router.get('/:module/:requestID/:filename', ensureAuthenticated, (req, res) => {
    const { module, requestID, filename } = req.params;

    const filePath = path.join(__dirname, '..', 'uploads', module, requestID, filename);

    // Check if file exists
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send('File not found.');
    }
});

module.exports = router;