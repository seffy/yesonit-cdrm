const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController'); // ✅ Correct path
const upload = require('../../../middlewares/uploadMiddleware'); // ✅ Correct import

// GET content form
router.get('/', contentController.getContentForm);

// POST content form (upload file)
router.post('/', upload.single('file'), contentController.postContentForm);

// GET update form
router.get('/:id/edit', contentController.getUpdateContentForm);

// POST update form (upload new file optional)
router.post('/:id/edit', upload.single('file'), contentController.updateContentForm);

module.exports = router;