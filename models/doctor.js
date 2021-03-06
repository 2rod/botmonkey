const mongoose = require('mongoose');

module.exports = mongoose.model('Doctor', {
  user_id: Schema.Types.ObjectId,
  gender: { type: String, enum: ['M', 'F', 'O'] },
  birthdate: { type: Date, max: Date.now() },
  treatment_certs: [Schema.Types.ObjectId]
});
