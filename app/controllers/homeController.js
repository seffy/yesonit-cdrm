// controllers/homeController.js
exports.getHome = (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }
    res.render('dashboard/home');
};