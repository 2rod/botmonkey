const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const userSchema = mongoose.Schema({
  password: String,
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  street_address: String,
  city: String,
  state: String,
  zip_code: String,
  phone: String,
  email: { type: String, required: true },
  gender: { type: String, enum: ['M', 'F', 'O'] },
  birthdate: { type: Date, max: Date.now() },
  user_type: { type: String, enum: ['doctor', 'nurse', 'patient'], required: true },
  medical_number: { type: Number, min: 10000000, max: 99999999, required: true }
});

userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'medical_number',
  startAt: 10000000,
  incrementBy: 100
});

module.exports = mongoose.model('User', userSchema);
