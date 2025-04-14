// controllers/allRequestsController.js
const ContentRequest = require('../models/ContentRequest');

exports.getAllRequests = async (req, res) => {
  try {
    // Retrieve all requests and populate the requestType field.
    // Sort the submissions by createdAt descending (newest first).
    const requests = await ContentRequest.find()
                              .populate('requestType')
                              .sort({ createdAt: -1 })
                              .exec();

    res.render('allRequests', { requests });
  } catch (err) {
    console.error("Error retrieving all requests:", err);
    res.render('allRequests', { error: "Error retrieving all requests.", requests: [] });
  }
};