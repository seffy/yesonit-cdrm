// controllers/mainContentController.js
const User = require('../models/User');

exports.getMainContentPage = async (req, res) => {
  // Ensure the user is logged in (this assumes your auth logic stores userID in session)
  if (!req.session.userId) {
    return res.redirect('/');
  }
  
  try {
    // Fetch the current user's record to use for access-level checks on the page.
    const user = await User.findById(req.session.userId);
    res.render('mainContentPage', { user });
  } catch (err) {
    console.error(err);
    res.render('mainContentPage', { error: 'Unable to load main content page.' });
  }
};