// controllers/adminController.js
const Department = require('../models/Department');
const Tool = require('../modules/toolsAccess/models/Tool');
const RequestType = require('../modules/cloudContent/models/RequestType');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Render the admin page
exports.getAdminPage = (req, res) => {
    const message = req.query.message || null;
    const error = req.query.error || null;
    res.render('admin/admin', { message, error });
};

// Add a new department
exports.addDepartment = async (req, res) => {
    const { departmentName } = req.body;
    try {
        const newDepartment = new Department({ name: departmentName });
        await newDepartment.save();
        res.redirect('/admin?message=Department added successfully');
    } catch (err) {
        console.error(err);
        res.redirect('/admin?error=Error adding department');
    }
};

// Add a new tool
exports.addTool = async (req, res) => {
    const { toolName } = req.body;
    try {
        const newTool = new Tool({ name: toolName });
        await newTool.save();
        res.redirect('/admin?message=Tool added successfully');
    } catch (err) {
        console.error(err);
        res.redirect('/admin?error=Error adding tool');
    }
};

// Add a new request type
exports.addRequestType = async (req, res) => {
    const { requestType } = req.body;
    try {
        const newRequestType = new RequestType({ type: requestType });
        await newRequestType.save();
        res.redirect('/admin?message=Request type added successfully');
    } catch (err) {
        console.error(err);
        res.redirect('/admin?error=Error adding request type');
    }
};

// Add new user access by creating a new user record
exports.addUserAccess = async (req, res) => {
    const { email, tempPassword } = req.body;
    try {
        // Find or create a default department called "Admin" to assign to new users
        let department = await Department.findOne({ name: "Admin" });
        if (!department) {
            department = new Department({ name: "Admin" });
            await department.save();
        }
        // Use the email as the default name
        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        const newUser = new User({
            name: email, // using email as a placeholder name
            department: department._id,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.redirect('/admin?message=User access added successfully');
    } catch (err) {
        console.error(err);
        res.redirect('/admin?error=Error adding user access');
    }
};