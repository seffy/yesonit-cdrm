// routes/allRequests.js
const express = require('express');
const router = express.Router();
const allRequestsController = require('../controllers/allRequestsController');
const { checkAccessLevel } = require('../../../middlewares/accessControl');

// Only allow users with Level 2, Level 3, Level 4, or Level 5 access level.
router.get('/', checkAccessLevel(["Level 2", "Level 3", "Level 4", "Level 5"]), allRequestsController.getAllRequests);

module.exports = router;