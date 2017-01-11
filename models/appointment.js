const mongoose = require('mongoose');

module.exports = mongoose.model('Appointment', {
  date: Date,
  patient_id: { type: Schema.Types.ObjectId, ref: 'Patient' },
  doctor_id: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  type: { type: String, enum: ['initial', 'follow-up', 'maintenance', 'final'] },
  condition_treated: { type: String, enum: ['condition1', 'condition2', 'condition3'] },
  treatment_given: { type: String, enum: ['treatment1', 'treatment2', 'treatment3'] },
  medication_prescribed: { type: String, enum: ['medication1', 'medication2', 'medication3'] }
});
