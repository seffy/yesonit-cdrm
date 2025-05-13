// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { checkAccessLevel } = require('../middlewares/accessControl');

// Only allow users with Level 4 and Level 5 access level
router.get('/', checkAccessLevel(["Level 4", "Level 5"]), adminController.getAdminPage);
router.post('/addDepartment', checkAccessLevel(["Level 4", "Level 5"]), adminController.addDepartment);
router.post('/addRequestType', checkAccessLevel(["Level 4", "Level 5"]), adminController.addRequestType);
router.post('/addUser', checkAccessLevel(["Level 4", "Level 5"]), adminController.addUserAccess);

module.exports = router;