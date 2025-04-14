// controllers/contentController.js
const ContentRequest = require('../models/ContentRequest');
const RequestType = require('../models/RequestType');
const User = require('../models/User');

/**
 * Generates a unique six-digit string for the Request ID.
 */
async function generateUniqueSixDigitID() {
  let candidate;
  let exists = true;
  // Loop until a unique candidate is found.
  do {
    candidate = Math.floor(100000 + Math.random() * 900000).toString();
    const reqExists = await ContentRequest.findOne({ requestID: candidate });
    if (!reqExists) {
      exists = false;
    }
  } while (exists);
  return candidate;
}

exports.getContentForm = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  try {
    const requestTypes = await RequestType.find({});
    const user = await User.findById(req.session.userId);
    // Generate a unique six-digit Request ID
    const autoRequestID = await generateUniqueSixDigitID();
    
    res.render('contentForm', { 
      requestTypes, 
      userEmail: user.email,
      autoRequestID 
    });
  } catch (err) {
    console.error(err);
    res.render('contentForm', { error: 'Unable to load request types', requestTypes: [] });
  }
};

exports.postContentForm = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  
  // Destructure form fields; note requestID comes from the form's read-only field.
  let { 
    requestID,
    requestType, 
    requestTitle, 
    dueDate, 
    pointOfContact, 
    details, 
    approval,   // Legacy field if still needed
    status,
    assignTo, 
    updateApproval 
  } = req.body;
  
  // Ensure optional fields are either set or left empty:
  assignTo = assignTo || "";
  updateApproval = updateApproval || "";
  
  let filePath = '';
  if (req.file) {
    filePath = req.file.path;
  }
  
  try {
    // Verify that the passed requestID is unique; if not, generate a new one.
    const exists = await ContentRequest.findOne({ requestID });
    if (exists) {
      requestID = await generateUniqueSixDigitID();
      console.log("Collision detected. Generated new Request ID: " + requestID);
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
      approval,  // if needed
      createdBy: req.session.userId,
      submittedBy: submittingUser.email,
      status,
      assignTo,
      updateApproval
    });
    
    await contentRequest.save();
    res.redirect('/my-requests');
  } catch (err) {
    console.error(err);
    const requestTypes = await RequestType.find({});
    const user = await User.findById(req.session.userId);
    res.render('contentForm', { 
      error: 'Error submitting content request', 
      requestTypes,
      userEmail: user.email,
      autoRequestID: requestID // use the current candidate
    });
  }
};



// Helper function to generate a unique six-digit ID (used in the getContentForm)
// ... (existing helper and getContentForm/postContentForm methods here)

/**
 * GET /content/:id/edit
 * Load the update form for a specific content request.
 */
exports.getUpdateContentForm = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  try {
    // Find the content request by its ID
    const request = await ContentRequest.findById(req.params.id).exec();
    if (!request) {
      return res.status(404).send("Content request not found.");
    }
    // Optionally, you could check that the logged-in user is allowed to edit this request.

    // Load available request types if you allow updating the request type.
    const requestTypes = await RequestType.find({});

    res.render('updateRequest', {
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
 * Process the update of a content request.
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
    
    // Update fields from form submission (do not update requestID and submittedBy)
    const { 
      requestType,
      requestTitle,
      dueDate,
      pointOfContact,
      details,
      approval,    // if applicable; otherwise ignore or remove
      status,
      assignTo,
      updateApproval
    } = req.body;

    // If a new file is uploaded, update the file field
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

    // Retrieve list of request types for the form
    const requestTypes = await RequestType.find({});

    // Instead of redirecting, re-render the update page and display a success message.
    res.render('updateRequest', { 
      request, 
      requestTypes, 
      success: "Request Updated Successfully" 
    });
  } catch (err) {
    console.error("Error updating content request: ", err);
    const requestTypes = await RequestType.find({});
    res.render('updateRequest', { 
      request: req.body, 
      requestTypes, 
      error: "Error updating the request. Please try again." 
    });
  }
};