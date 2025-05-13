// models/RequestType.js
const mongoose = require('mongoose');

const RequestTypeSchema = new mongoose.Schema({
    type: { type: String, required: true }
});

module.exports = mongoose.model('RequestType', RequestTypeSchema);