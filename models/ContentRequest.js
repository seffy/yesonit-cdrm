// models/ContentRequest.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ContentRequestSchema = new mongoose.Schema({
  requestID: { type: String, default: () => uuidv4() },
  requestType: { type: mongoose.Schema.Types.ObjectId, ref: 'RequestType', required: true },
  requestTitle: { type: String, required: true },
  dueDate: { type: Date, required: true },
  pointOfContact: { type: String},
  details: { type: String },
  file: { type: String }, // File path/name from upload
  approval: { type: String }, // This may be kept for backward compatibility or repurposed
  // New fields:
  submittedBy: { type: String },         // Current logged-in user's email
  status: { type: String, default: 'Outstanding' },   // Options: Outstanding, In Progress, Completed, Closed
  assignTo: { type: String },          // Assigned user's email
  updateApproval: { type: String },      // Approval user's email
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContentRequest', ContentRequestSchema);