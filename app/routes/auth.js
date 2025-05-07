// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkAccessLevel } = require('../middlewares/accessControl');

// Only allow registration for users with Level 3, Level 4, or Level 5 access level.
router.get('/register', checkAccessLevel(["Level 3", "Level 4", "Level 5"]), authController.getRegister);
router.post('/register', checkAccessLevel(["Level 3", "Level 4", "Level 5"]), authController.postRegister);

// Login and logout routes (open to everyone or as required)
router.get('/', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);

module.exports = router;