const mongoose = require('mongoose');

module.exports = mongoose.model('Doctor', {
  user_id: Number,
  gender: { type: String, enum: ['M', 'F', 'O'] },
  birthdate: { type: Date, max: Date.now() },
  treatment_certs: [Number]
});
