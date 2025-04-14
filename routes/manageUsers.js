// routes/manageUsers.js
const express = require('express');
const router = express.Router();
const manageUsersController = require('../controllers/manageUsersController');
const { checkAccessLevel } = require('../middlewares/accessControl');

// Only allow users with Level 4 and Level 5 access.
router.get('/', checkAccessLevel(["Level 4", "Level 5"]), manageUsersController.getAllUsers);

// Optional: routes for editing a user (View/Update)
router.get('/:id/edit', checkAccessLevel(["Level 4", "Level 5"]), manageUsersController.getEditUserForm);
router.post('/:id/edit', checkAccessLevel(["Level 4", "Level 5"]), manageUsersController.updateUser);

module.exports = router;