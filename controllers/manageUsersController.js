// controllers/manageUsersController.js
const User = require('../models/User');
const Department = require('../models/Department');

// Fetch and display all users in the system.
// Populate the "department" field so that the department name can be shown.
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('department').exec();
    res.render('manageUsers', { users });
  } catch (err) {
    console.error("Error fetching users: ", err);
    res.render('manageUsers', { error: "Error retrieving users.", users: [] });
  }
};

exports.getEditUserForm = async (req, res) => {
  try {
    // Find the user by ID and populate the department field.
    const user = await User.findById(req.params.id).populate('department').exec();
    if (!user) {
      return res.status(404).send("User not found.");
    }
    // Retrieve all departments so the admin can update the user's department.
    const departments = await Department.find({});
    res.render('editUser', { user, departments });
  } catch (err) {
    console.error("Error retrieving user:", err);
    res.status(500).send("Error retrieving user.");
  }
};

// Optional update function remains unchanged if already implemented.
exports.updateUser = async (req, res) => {
  try {
    const { name, department, email, accessLevel } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    // Update the fields. The department field will be stored as the selected department's ObjectId.
    user.name = name;
    user.department = department;
    user.email = email;
    user.accessLevel = accessLevel;
    await user.save();
    res.redirect('/manage-users');
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Error updating user.");
  }
};