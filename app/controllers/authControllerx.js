// app/controllers/authController.js
const User = require('../models/User');
const Department = require('../models/Department');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  res.render('auth/login', { error: null });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('auth/login', { error: 'Invalid email or password' });
    }

    if (user.accessLevel === 'blocked') {
      return res.render('auth/login', {
        error: 'Your access is blocked, please contact your Manager or your IT Administrator'
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('auth/login', { error: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    req.session.accessLevel = user.accessLevel;
    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.render('auth/login', { error: 'Something went wrong.' });
  }
};

exports.getRegister = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.render('auth/register', { departments, error: null, success: null });
  } catch (err) {
    console.error(err);
    res.render('auth/register', { error: 'Unable to load departments', departments: [], success: null });
  }
};

exports.postRegister = async (req, res) => {
  const { name, department, email, password, confirmPassword, accessLevel } = req.body;

  try {
    const departments = await Department.find({});

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('auth/register', {
        error: 'User already exists, please use a different email.',
        success: null,
        departments
      });
    }

    if (password !== confirmPassword) {
      return res.render('auth/register', {
        error: 'Passwords do not match',
        success: null,
        departments
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      department,
      email,
      password: hashedPassword,
      accessLevel
    });
    await newUser.save();

    const updatedDepartments = await Department.find({});
    res.render('auth/register', {
      success: 'User successfully added!',
      error: null,
      departments: updatedDepartments
    });

  } catch (err) {
    console.error(err);
    const departments = await Department.find({});
    res.render('auth/register', {
      error: 'Error registering user',
      success: null,
      departments
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
