const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/toolsController');
const { requireAccessLevel } = require('../../../middlewares/accessControl');

router.get('/form', toolsController.getToolsForm);

// Form to create new Tool Access Request
router.post('/form', toolsController.postToolsForm);

// My Submitted Tools Requests
router.get('/my-requests', toolsController.viewMyToolsRequests);

// All Tools Requests (Admin Only)

// Tools Dashboard
router.get('/dashboard', toolsController.getToolsDashboard);

module.exports = router;