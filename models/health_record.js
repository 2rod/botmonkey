const mongoose = require('mongoose');

const healthRecordSchema = mongoose.Schema({
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
    }
  },
  nurse_id: { type: Schema.Types.ObjectId, ref: 'User'},
  case_number: { type: Number }
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
