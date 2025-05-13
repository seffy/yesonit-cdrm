// controllers/contentController.js
const ContentRequest = require('../models/ContentRequest');
const RequestType = require('../models/RequestType');
const User = require('../models/User');

/**
 * Helper: Generate a unique six-digit string for Request ID
 */
async function generateUniqueSixDigitID() {
  let candidate;
  let exists = true;
  do {
    candidate = Math.floor(100000 + Math.random() * 900000).toString();
    const reqExists = await ContentRequest.findOne({ requestID: candidate });
    if (!reqExists) {
      exists = false;
    }
  } while (exists);
  return candidate;
}

/**
 * GET /content
 * Load the content request form
 */
exports.getContentForm = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  try {
    const requestTypes = await RequestType.find({});
    const user = res.locals.user;
    const autoRequestID = await generateUniqueSixDigitID();

    res.render('cloudContent/contentForm', {
      requestTypes,
      userEmail: user.email,
      autoRequestID
    });
  } catch (err) {
    console.error(err);
    res.render('cloudContent/contentForm', { 
      error: 'Unable to load request types', 
      requestTypes: [] 
    });
  }
};

/**
 * POST /content
 * Create a new content request
 */
exports.postContentForm = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }

  // Handle request ID if it's sent as an array
  let requestID = req.body.requestID;
  if (Array.isArray(requestID)) {
    requestID = requestID[0];
  }

  let { 
    requestType, 
    requestTitle, 
    dueDate, 
    pointOfContact, 
    details, 
    approval,
    status,
    assignTo, 
    updateApproval 
  } = req.body;

  assignTo = assignTo || "";
  updateApproval = updateApproval || "";

  let filePath = '';
  if (req.file) {
    filePath = req.file.path;
  }

  try {
    // Double check if requestID already exists
    const exists = await ContentRequest.findOne({ requestID });
    if (exists) {
      requestID = await generateUniqueSixDigitID();
      console.log("Collision detected. New Request ID: " + requestID);
    }

    const submittingUser = await User.findById(req.session.userId);

    const contentRequest = new ContentRequest({
      requestID,
      requestType,
      requestTitle,
      dueDate,
      pointOfContact,
      details,
      file: filePath,
      approval,
      createdBy: req.session.userId,
      submittedBy: submittingUser.email,
      status,
      assignTo,
      updateApproval
    });

    await contentRequest.save();
    console.log(
  `[${new Date().toISOString()}] ${submittingUser.email} submitted request: ${requestID} (${requestTitle})`
);
    res.redirect('/my-requests');
  } catch (err) {
    console.error(err);
    const requestTypes = await RequestType.find({});
    const user = res.locals.user;
    res.render('cloudContent/contentForm', { 
      error: 'Error submitting content request', 
      requestTypes,
      userEmail: user.email,
      autoRequestID: requestID
    });
  }
};

/**
 * GET /content/:id/edit
 * Load the edit form for a specific request
 */
exports.getUpdateContentForm = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  try {
    const request = await ContentRequest.findById(req.params.id).exec();
    if (!request) {
      return res.status(404).send("Content request not found.");
    }

    const requestTypes = await RequestType.find({});
    res.render('cloudContent/updateRequest', {
      request,
      requestTypes
    });
  } catch (err) {
    console.error("Error loading update form: ", err);
    res.status(500).send("Error loading the update form.");
  }
};

/**
 * POST /content/:id/edit
 * Update an existing content request
 */
exports.updateContentForm = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }

  try {
    const request = await ContentRequest.findById(req.params.id).exec();
    if (!request) {
      return res.status(404).send("Content request not found.");
    }

    let { 
      requestType,
      requestTitle,
      dueDate,
      pointOfContact,
      details,
      approval,
      status,
      assignTo,
      updateApproval 
    } = req.body;

    assignTo = assignTo || "";
    updateApproval = updateApproval || "";

    if (req.file) {
      request.file = req.file.path;
    }

    request.requestType = requestType;
    request.requestTitle = requestTitle;
    request.dueDate = dueDate;
    request.pointOfContact = pointOfContact;
    request.details = details;
    request.approval = approval;
    request.status = status;
    request.assignTo = assignTo;
    request.updateApproval = updateApproval;

    await request.save();

    const requestTypes = await RequestType.find({});
    res.render('cloudContent/updateRequest', { 
      request,
      requestTypes,
      success: "Request Updated Successfully"
    });
  } catch (err) {
    console.error("Error updating content request: ", err);
    const requestTypes = await RequestType.find({});
    res.render('cloudContent/updateRequest', { 
      request: req.body,
      requestTypes,
      error: "Error updating the request. Please try again."
    });
  }
};


exports.deleteContentRequest = async (req, res) => {
  try {
    await ContentRequest.findByIdAndDelete(req.params.id);
    res.redirect('/all-requests');
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete the request");
  }
};