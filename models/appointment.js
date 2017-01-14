const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  date: Date,
  patient_id: { type: Schema.Types.ObjectId, ref: 'User' },
  doctor_id: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['initial', 'follow-up', 'maintenance', 'final'] },
  condition_treated: { type: String, enum: ['condition1', 'condition2', 'condition3'] },
  treatment_given: { type: String, enum: ['treatment1', 'treatment2', 'treatment3'] },
  medication_prescribed: { type: String, enum: ['medication1', 'medication2', 'medication3'] },
  case_number: { type: Number, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
