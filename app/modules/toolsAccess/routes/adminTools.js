const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/cloudContent/toolsController'); // or adminToolsController if separated

// Show Manage Tools Page
router.get('/tools', toolsController.getManageToolsPage);

// Add New Tool
router.post('/tools/add', toolsController.postAddTool);

// Delete Tool
router.post('/tools/:id/delete', toolsController.postDeleteTool);

module.exports = router;