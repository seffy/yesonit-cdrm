// controllers/toolsController.js
const ToolsRequest = require('../models/ToolsRequest');
const Tool = require('../models/Tool');
const User = require('../../../models/User');

// Helper: Generate Unique Six-Digit Request ID

async function generateUniqueSixDigitID() {
  let candidate;
  let exists = true;
  do {
    candidate = Math.floor(100000 + Math.random() * 900000).toString();
    const reqExists = await ToolsRequest.findOne({ requestID: candidate });
    if (!reqExists) {
      exists = false;
    }
  } while (exists);
  return candidate;
}

exports.getToolsForm = (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  res.render('toolsAccess/toolsForm');
};

exports.postToolsForm = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }

  try {
    const user = res.locals.user;

    const {
      requestFor,
      selectedTool,
      justification,
      approval,
      requestorName,    // if available
      employeeId,       // if available
      employeeEmail     // if available
    } = req.body;

    const requestID = await generateUniqueSixDigitID();

    const newRequest = new ToolsRequest({
      requestID,
      requestFor,
      selectedTool,
      justification,
      approval,
      requestorName: requestorName || "",
      employeeId: employeeId || "",
      employeeEmail: employeeEmail || "",
      createdBy: user._id,
      submittedBy: user.email,   // ✅ FIXED: Save submittedBy
      status: 'Outstanding',     // ✅ FIXED: Default status
    });

    await newRequest.save();

    res.redirect('/tools/my-requests');

  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting tool request.');
  }
};




// View My Submitted Tools Requests
exports.viewMyToolsRequests = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }

  try {
    // Fetch the logged-in user
    //const user = res.locals.user;
    const user = res.locals.user;

    if (!user) {
      return res.redirect('/');
    }

    // Find all ToolsRequests submitted by this user (matching submittedBy email)
    const requests = await ToolsRequest.find({ submittedBy: user.email }).sort({ createdAt: -1 });

    res.render('toolsAccess/viewMyToolsRequests', { requests });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading your tools requests.');
  }
};
  
  // View All Tools Requests
  exports.viewAllToolsRequests = async (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/');
    }
  
    try {
      const requests = await ToolsRequest.find().sort({ createdAt: -1 });
      res.render('toolsAccess/viewAllToolsRequests', { requests });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error loading all tools requests.');
    }
  };

  // GET /tools/dashboard
exports.getToolsDashboard = async (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/');
    }
  
    try {
      const user = res.locals.user;
      res.render('toolsAccess/toolsDashboard', { userAccessLevel: user.accessLevel });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error loading tools dashboard.');
    }
  };