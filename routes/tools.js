// routes/tools.js
const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/toolsController');

router.get('/', toolsController.getToolsForm);
router.post('/', toolsController.postToolsForm);

module.exports = router;