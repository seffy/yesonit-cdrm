// seedTools.js (optional quick script)
const mongoose = require('mongoose');
const Tool = require('./models/Tool');

mongoose.connect('your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB Connected');

    await Tool.insertMany([
      { name: 'Jira' },
      { name: 'Confluence' },
      { name: 'VPN Access' },
      { name: 'AWS Console Access' },
      { name: 'GCP Admin' }
    ]);

    console.log('Tools Seeded!');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));