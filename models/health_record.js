const mongoose = require('mongoose');

module.exports = mongoose.model('HealthRecord', {
  appointment_id: { type: Schema.Types.ObjectId, ref: 'Appointment'},
  vitals: {
    vital_1: {
      name: String,
      value: Number
    },
    vital_2: {
      name: String,
      value: Number
    },
    vital_3: {
      name: String,
      value: Number
    },
  },
  nurse_id: { type: Schema.Types.ObjectId, ref: 'User'},
});
