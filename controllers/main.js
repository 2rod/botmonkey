'use strict';

const config = require('../nconf');

let user = null;

module.exports.index = function* index () {
  if (this.isAuthenticated()) {
    user = this.session.passport.user;
  }
  yield this.render('index', {
    title: config.SITE_NAME,
    user: user
  });
};
