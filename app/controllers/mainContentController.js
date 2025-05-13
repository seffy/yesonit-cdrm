// controllers/mainContentController.js
const User = require('../models/User');
const ContentRequest = require('../models/ContentRequest');

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



exports.getMainContentPage = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    
    const outstandingRequests = await ContentRequest.find({
      submittedBy: user.email,
  status: { $in: ['Outstanding', 'In Progress', 'In progress'] } // match real values
    });

    res.render('cloudContent/mainContentPage', {
      user,
      outstandingRequests
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to load main content page.");
  }
};