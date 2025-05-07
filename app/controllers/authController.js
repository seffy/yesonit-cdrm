// controllers/authController.js
const User = require('../models/User');
const Department = require('../models/Department');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('auth/login');
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email });
      
      // Check if user exists
      if (!user) {
        return res.render('login', { error: 'Invalid email or password' });
      }
      
      // Check if user's access level is "blocked"
      if (user.accessLevel === 'blocked') {
        return res.render('login', { error: 'Your access is blocked, please contact your Manager or your IT Administrator' });
      }
      
      // Verify password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.render('login', { error: 'Invalid email or password' });
      }
      
      // Successful login: store the user id in session and redirect
      req.session.userId = user._id;
      res.redirect('/home'); // or your appropriate page
    } catch (err) {
      console.error(err);
      res.render('login', { error: 'Something went wrong.' });
    }
  };

exports.getRegister = async (req, res) => {
    // Fetch departments from MongoDB
    try {
        const departments = await Department.find({});
        res.render('auth/register', { departments });
    } catch (err) {
        console.error(err);
        res.render('auth/register', { error: 'Unable to load departments', departments: [] });
    }
};

exports.postRegister = async (req, res) => {
  const { name, department, email, password, confirmPassword, accessLevel } = req.body;
  
  try {
      const departments = await Department.find({});

      // ✅ Check if user already exists first
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.render('auth/register', {
              error: 'User already exists, please use a different email.',
              success: null,
              departments
          });
      }

      // ✅ Check if passwords match
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
      
      // ✅ After successful save, reload departments
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