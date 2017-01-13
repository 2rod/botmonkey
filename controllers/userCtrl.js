const userCtrl = {};

const User = require('../models/user');

userCtrl.getAllUsers = function* (next) {
  this.body = yield User.find((err, users) => {
    if (err) return console.error(err);
  });
  this.status = 200;
};

userCtrl.getUsersByType = function* (next) {
  this.body = yield User.find({ user_type: this.params.user_type }, (err, users) => {
    if (err) return console.error(err);
  });
  this.status = 200;
};

userCtrl.getUsers = function* (next) {
  const queryObj = {};
  queryObj[this.request.body.prop] = this.request.body.propValue;
  this.body = yield User.find(queryObj, (err, users) => {
    if (err) return console.error(err);
  });
  this.status = 200;
};

userCtrl.getUserByFullName = function* (next) {
  const body = this.request.body;
  this.body = yield User.find({ first_name: new RegExp(`^${body.first_name}$`, 'i'), last_name: new RegExp(`^${body.last_name}$`, 'i') }, (err, user) => {
    if (err) return console.error(err);
  });
  this.status = 200;
};

userCtrl.getUsersByGender = function* (next) {
  this.body = yield User.find({ gender: this.params.gender.toUpperCase(), user_type: this.params.user_type }, (err, users) => {
    if (err) return console.error(err);
  });
  this.status = 200;
};

userCtrl.addUser = function* (next) {
  const userData = this.request.body;
  this.body = yield User.create({
    first_name: this.body.first_name,
    last_name: this.body.last_name,
    street_address: this.body.street_address,
    city: this.body.city,
    state: this.body.state,
    zip_code: this.body.zip_code,
    phone: this.body.phone,
    email: this.body.email,
    gender: this.body.gender,
    birthdate: this.body.birthdate,
    user_type: this.body.user_type
  }, (err, user) => {
    if (err) return console.error(err);
    console.log('user added: ', user);
  });
  this.status = 201;
};

userCtrl.deleteUser = function* (next) {
  this.body = yield User.remove({
    medical_number: this.request.body.medical_number
  });
  this.status = 202;
};

module.exports = userCtrl;
