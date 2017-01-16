const appointmentCtrl = {};

const Appointment = require('../models/appointment');

appointmentCtrl.getAllAppointments = function* (next) {
  this.body = yield Appointment.find()
  .then((appointments) => {
    if (appointments) {
      this.status = 200;
      return appointments;
    }
    return { found: 0, err: 'no appointments found!' };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { found: 0, err: err.message };
  });
};

appointmentCtrl.getAppointmentsByDate = function* (next) {
  const date = new Date(this.request.body.date);
  const newDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
  const nextDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`);
  this.body = yield Appointment.find({ date: { $lte: nextDate, $gt: newDate } })
  .then((appointments) => {
    if (appointments) {
      this.status = 200;
      return appointments;
    }
    return { found: 0, err: 'no appointments found!' };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { found: 0, err: err.message };
  });
};

appointmentCtrl.getAppointmentById = function* (next) {
  this.body = yield Appointment.findById(this.params.id)
  .then((appointment) => {
    if (appointment) {
      this.status = 200;
      return appointment;
    }
    return { found: 0, err: 'appointment not found!' };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { found: 0, err: err.message };
  });
};

appointmentCtrl.getAppointmentsByPatientId = function* (next) {
  this.body = yield Appointment.find({ patient_id: this.params.id })
  .then((appointments) => {
    if (appointments) {
      this.status = 200;
      return appointments;
    }
    return { found: 0, err: 'appointments not found!' };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { found: 0, err: err.message };
  });
};

appointmentCtrl.getAppointmentsByDoctorId = function* (next) {
  this.body = yield Appointment.find({ doctor_id: this.params.id })
  .then((appointments) => {
    if (appointments) {
      this.status = 200;
      return appointments;
    }
    return { found: 0, err: 'appointments not found!' };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { found: 0, err: err.message };
  });
};

appointmentCtrl.addAppointment = function* (next) {
  const appointmentData = this.request.body;
  this.body = yield Appointment.create(appointmentData)
  .then((appointment) => {
    this.status = 200;
    console.log('appointment added: ', appointment);
    return { added: 1, appointment_id: appointment._id };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { added: 0, err: err.message };
  });
};

appointmentCtrl.updateAppointmentById = function* (next) {
  this.body = yield Appointment.findByIdAndUpdate(this.params.id, this.request.body)
  .then((appointment) => {
    this.status = 200;
    console.log('appointment updated: ', appointment);
    return { updated: 1, appointment_id: appointment._id };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { updated: 0, err: err.message };
  });
};

appointmentCtrl.deleteAppointment = function* (next) {
  this.body = yield Appointment.findByIdAndRemove(this.params.id)
  .then((result) => {
    if (!result) {
      console.error('appointment not found!');
      return { deleted: 0, err: 'appointment not found!' };
    }
    console.log('appointment deleted');
    this.status = 202;
    return { deleted: 1, appointment_id: result._id };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { deleted: 0, err: err.message };
  });
};

module.exports = appointmentCtrl;
