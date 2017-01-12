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
  gender: { type: String, enum: ['M', 'F', 'O'] },
  birthdate: { type: Date, max: Date.now() },
  user_type: { type: String, enum: ['doctor', 'nurse', 'patient'] },
});
