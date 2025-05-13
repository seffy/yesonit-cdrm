// routes/mainContent.js
const express = require('express');
const router = express.Router();
const mainContentController = require('../controllers/mainContentController');
const { checkAccessLevel } = require('../middlewares/accessControl');

// You can require any specific access control middleware here if desired.
// In this example, the main content page is accessible to all logged-in users.
router.get('/', mainContentController.getMainContentPage);

module.exports = router;