const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  username: { type: String, lowercase: true },
  password: String,
  first_name: String,
  last_name: String,
  street_address: String,
  city: String,
  state: String,
  zip_code: String,
  phone: String,
  email: String,
  user_type: Number
});
