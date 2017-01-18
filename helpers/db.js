const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = (process.env.MONGODB_URI) ? process.env.MONGODB_URI : 'mongodb://localhost:27017/botmonkey';

mongoose.connect(url, function (err, db) {
  if (err) console.error('error connecting: ' + err.stack);
  else console.log('Connection established to', url);
});

module.exports = mongoose.connection;
