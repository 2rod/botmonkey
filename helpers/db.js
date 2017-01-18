const mongoose = require('mongoose');
const config = require('./nconf');

mongoose.Promise = global.Promise;

const url = config.MONGODB_URI;

mongoose.connect(url, function (err, db) {
  if (err) console.error('error connecting: ' + err.stack);
  else console.log('Connection established to', url);
});

module.exports = mongoose.connection;
