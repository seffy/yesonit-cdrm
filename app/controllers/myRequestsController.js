// controllers/myRequestsController.js
const ContentRequest = require('../models/ContentRequest');

exports.getMyRequests = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  try {
    // Sort by createdAt descending (-1) so that newest submissions appear at the top.
    const requests = await ContentRequest.find({ createdBy: req.session.userId })
                              .populate('requestType')
                              .sort({ createdAt: -1 })
                              .exec();

    res.render('cloudContent/myRequests', { requests });
  } catch (err) {
    console.error('Error retrieving submitted requests:', err);
    res.render('cloudContent/myRequests', { error: 'Error retrieving submitted requests.', requests: [] });
  }
};