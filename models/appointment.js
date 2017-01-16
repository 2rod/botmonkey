const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = mongoose.Schema({
  date: { type: Date, required: true },
  patient_id: { type: Schema.Types.ObjectId, ref: 'User' },
  doctor_id: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['initial', 'follow-up', 'maintenance', 'final'] },
  condition_treated: { type: String, enum: ['condition1', 'condition2', 'condition3'] },
  treatment_given: { type: String, enum: ['treatment1', 'treatment2', 'treatment3'] },
  medication_prescribed: { type: String, enum: ['medication1', 'medication2', 'medication3'] }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
