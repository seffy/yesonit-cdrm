// controllers/mainContentController.js
const User = require('../../../models/User');

exports.getMainContentPage = async (req, res) => {
  // Ensure the user is logged in (this assumes your auth logic stores userID in session)
  if (!req.session.userId) {
    return res.redirect('/');
  }
  
  try {
    const user = res.locals.user;
    res.render('cloudContent/mainContentPage', { user });
  } catch (err) {
    console.error(err);
    res.render('cloudContent/mainContentPage', { error: 'Unable to load main content page.' });
  }
};