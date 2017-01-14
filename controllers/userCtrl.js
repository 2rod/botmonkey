const userCtrl = {};

const User = require('../models/user');

userCtrl.getAllUsers = function* (next) {
  this.body = yield User.find()
  .then((users) => {
    if (users) {
      this.status = 200;
      return users;
    }
    return { found: 0, err: 'no users found!' };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { found: 0, err: err.message };
  });
};

userCtrl.getUsersByType = function* (next) {
  this.body = yield User.find({ user_type: this.params.user_type })
  .then((users) => {
    if (users) {
      this.status = 200;
      return users;
    }
    return { found: 0, err: 'no users found!' };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { found: 0, err: err.message };
  });
};

userCtrl.getUserByMedicalId = function* (next) {
  this.body = yield User.findOne({ 'medical_number': this.params.medical_number})
  .then((user) => {
    if (user) {
      this.status = 200;
      return user;
    }
    return { found: 0, err: 'user not found!' };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { found: 0, err: err.message };
  });
};

userCtrl.getUserByFullName = function* (next) {
  const body = this.request.body;
  this.body = yield User.find({ first_name: new RegExp(`^${body.first_name}$`, 'i'), last_name: new RegExp(`^${body.last_name}$`, 'i') })
  .then((users) => {
    if (users) {
      this.status = 200;
      return users;
    }
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { found: 0, err: err.message };
  });
};

userCtrl.getUsersByGender = function* (next) {
  this.body = yield User.find({ gender: this.params.gender.toUpperCase(), user_type: this.params.user_type })
  .then((users) => {
    if (users) {
      this.status = 200;
      return users;
    }
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { found: 0, err: err.message };
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
  })
  .then((user) => {
    this.status = 200;
    console.log('user added: ', user);
    return { added: 1, user_id: user._id };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { added: 0, err: err.message };
  });
};

userCtrl.updateUserByMedicalNum = function* (next) {
  this.body = yield User.findOneAndUpdate({ medical_number: this.params.medical_number }, this.request.body)
  .then((user) => {
    this.status = 200;
    console.log('user updated: ', user);
    return { updated: 1, user_id: user._id };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { updated: 0, err: err.message };
  });
};

userCtrl.deleteUser = function* (next) {
  this.body = yield User.remove({
    medical_number: this.params.medical_number
  })
  .then((result) => {
    if (result.result.n === 0) {
      console.error('user not found!');
      return { deleted: 0, err: 'user not found!' };
    }
    console.log('user deleted');
    this.status = 202;
    return { deleted: 1 };
  })
  .catch((err) => {
    console.log('error', err);
    this.status = 400;
    return { deleted: 0, err: err.message };
  });
};

module.exports = userCtrl;
