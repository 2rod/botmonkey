const userCtrl = {};

const User = require('../models/user');

userCtrl.getAllUsers = function* (next) {
  this.body = yield User.find((err, users) => {
    if (err) return console.error(err);
    this.status = 200;
  });
};

userCtrl.getUsersByType = function* (next) {
  this.body = yield User.find({ user_type: this.params.user_type }, (err, users) => {
    if (err) return console.error(err);
    this.status = 200;
  });
};

userCtrl.getUsers = function* (next) {
  const queryObj = {};
  queryObj[this.request.body.prop] = this.request.body.propValue;
  this.body = yield User.find(queryObj, (err, users) => {
    if (err) return console.error(err);
    this.status = 200;
  });
};

userCtrl.getUserByFullName = function* (next) {
  const body = this.request.body;
  this.body = yield User.find({ first_name: new RegExp(`^${body.first_name}$`, 'i'), last_name: new RegExp(`^${body.last_name}$`, 'i') }, (err, user) => {
    if (err) return console.error(err);
    this.status = 200;
  });
};

userCtrl.getUsersByGender = function* (next) {
  this.body = yield User.find({ gender: this.params.gender.toUpperCase(), user_type: this.params.user_type }, (err, users) => {
    if (err) return console.error(err);
    this.status = 200;
  });
};

userCtrl.addUser = function* (next) {
  const userData = this.request.body;
  this.body = yield User.create({
    first_name: userData.first_name,
    last_name: userData.last_name,
    street_address: userData.street_address,
    city: userData.city,
    state: userData.state,
    zip_code: userData.zip_code,
    phone: userData.phone,
    email: userData.email,
    gender: userData.gender,
    birthdate: userData.birthdate,
    user_type: userData.user_type,
    medical_number: userData.medical_number
  }, (err, user) => {
    if (err) {
      this.status = 400;
      return console.error(err);
    }
    console.log('user added: ', user);
    this.status = 201;
  });
};

userCtrl.updateUserByMedicalNum = function* (next) {
  this.body = yield User.findOneAndUpdate(this.params.medical_number, this.request.body)
  .then((user) => {
    this.status = 200;
    return user;
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { err: err.message };
  });
};

userCtrl.deleteUser = function* (next) {
  this.body = yield User.remove({
    medical_number: this.params.medical_number
  }, (err, result) => {
    if (err || result.result.n === 0) {
      this.status = 400;
      return console.error(err ? err : 'user not found!');
    }
    console.log('user deleted');
    this.status = 202;
  });
};

module.exports = userCtrl;
