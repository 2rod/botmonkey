const mongoose = require('mongoose');

module.exports = mongoose.model('Patient', {
  user_id: Schema.Types.ObjectId,
  gender: { type: String, enum: ['M', 'F', 'O'] },
  birthdate: { type: Date, max: Date.now() },
  conditions: [Schema.Types.ObjectId],
  medications: [Schema.Types.ObjectId],
  treatments: [Schema.Types.ObjectId]
});
