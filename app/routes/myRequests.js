// routes/myRequests.js
const express = require('express');
const router = express.Router();
const myRequestsController = require('../controllers/myRequestsController');

// GET route to display the logged-in user's submitted requests
router.get('/', myRequestsController.getMyRequests);

module.exports = router;