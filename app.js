// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');





// Import Mongoose connection (see config/db.js)
const mongoose = require('./config/db');

const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Register routes
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const contentRoutes = require('./routes/content');
const toolsRoutes = require('./routes/tools');
const adminRoutes = require('./routes/admin');
const myRequestsRoutes = require('./routes/myRequests');
const allRequestsRoutes = require('./routes/allRequests');
const mainContentRoutes = require('./routes/mainContent');
const manageUsersRoutes = require('./routes/manageUsers');

app.use('/manage-users', manageUsersRoutes);
app.use('/content-manager', mainContentRoutes);
app.use('/admin', adminRoutes);
app.use('/', authRoutes);
app.use('/home', homeRoutes);
app.use('/content', contentRoutes);
app.use('/tools', toolsRoutes);
// ... other route usages ...
app.use('/my-requests', myRequestsRoutes);
app.use('/all-requests', allRequestsRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});