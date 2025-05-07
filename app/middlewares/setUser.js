// app/middlewares/setUser.js
const User = require('../models/User');

async function setUser(req, res, next) {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      res.locals.user = user;  // ✅ set user to res.locals
    } catch (err) {
      console.error("Error loading user into res.locals:", err);
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
}

module.exports = setUser;