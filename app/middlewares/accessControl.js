// middlewares/accessControl.js
const User = require('../models/User');

exports.checkAccessLevel = function(allowedLevels) {
    return async function(req, res, next) {
        // If no user is logged in, redirect them to the login page.
        if (!req.session.userId) {
            return res.redirect('/'); // or '/login' if your login route is separate
        }
        try {
            const user = res.locals.user;
            // If user is not found or their access level is not allowed, show an error.
            if (!user || !allowedLevels.includes(user.accessLevel)) {
                return res.status(403).send("You do not have permission to access this page.");
            }
            // Optionally, store the user object in req for future use
            req.user = user;
            next();
        } catch (err) {
            console.error(err);
            return res.status(500).send("Server error.");
        }
    }
};