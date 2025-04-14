// routes/content.js
const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const multer = require('multer');

// Existing multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Existing content request routes
router.get('/', contentController.getContentForm);
router.post('/', upload.single('file'), contentController.postContentForm);

// New routes for updating a request
router.get('/:id/edit', contentController.getUpdateContentForm);
router.post('/:id/edit', upload.single('file'), contentController.updateContentForm);

module.exports = router;