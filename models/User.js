// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessLevel: { type: String, default: "Level 1" }, // New field for Access Level
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);