// models/ToolsRequest.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ToolsRequestSchema = new mongoose.Schema({
    requestID: { type: String, default: () => uuidv4() },
    requestFor: { type: String, enum: ['myself', 'someone else'], required: true },
    // For "myself"
    selectedTool: { type: mongoose.Schema.Types.ObjectId, ref: 'Tool' },
    justification: { type: String },
    approval: { type: String },
    // For "someone else"
    requestorName: { type: String },
    employeeID: { type: String },
    employeeEmail: { type: String },
    tool: { type: mongoose.Schema.Types.ObjectId, ref: 'Tool' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ToolsRequest', ToolsRequestSchema);