const mongoose = require('mongoose');

module.exports = mongoose.model('Patient', {
  first_name: String,
  last_name: String,
  street_address: String,
  city: String,
  state: String,
  zip_code: String,
  phone: String,
  email: String,
  birthdate: Date,
  gender: String,
  race: String
});
