// controllers/authController.js
const User = require('../models/User');
const Department = require('../models/Department');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('login');
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
        res.render('register', { departments });
    } catch (err) {
        console.error(err);
        res.render('register', { error: 'Unable to load departments', departments: [] });
    }
};

exports.postRegister = async (req, res) => {
    // Extract accessLevel along with the other fields from the request body
    const { name, department, email, password, confirmPassword, accessLevel } = req.body;
    
    if (password !== confirmPassword) {
        const departments = await Department.find({});
        return res.render('register', { error: 'Passwords do not match', departments });
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            department,
            email,
            password: hashedPassword,
            accessLevel  // This will hold the value selected from the dropdown
        });
        await newUser.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const departments = await Department.find({});
        res.render('register', { error: 'Error registering user', departments });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};