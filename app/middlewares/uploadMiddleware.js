const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let requestId = req.body.requestID;

    // ✅ If requestId is an array, pick the first element
    if (Array.isArray(requestId)) {
      requestId = requestId[0];
    }

    if (!requestId) {
      return cb(new Error('Missing Request ID in form data'), false);
    }

    const uploadPath = path.join(__dirname, '../../uploads', requestId);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;