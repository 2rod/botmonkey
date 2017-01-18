'use strict';

const passport = require('../index.js').passport;
const config = require('../nconf');
const co = require('co');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const GithubStrategy = require('passport-github').Strategy;
// if we have a port other than 80, add it to our callback url
let port = '';
if (config.PORT !== 80) {
  port = `:${config.PORT}`;
}
passport.use(new GithubStrategy({
  clientID: config.GITHUB_CLIENT_ID,
  clientSecret: config.GITHUB_CLIENT_SECRET,
  callbackURL: `${config.OAUTH_HOST}${port}/auth/github/callback`
}, (token, tokenSecret, profile, done) => {
  // retrieve user ...
  co(function* auth () {
    // do some async/yield stuff here to get/set profile data
    done(null, profile);
  }).catch(function onError (e) {
    console.error('Something went terribly wrong!');
    console.error(e.stack);
    done(e, null);
  });
}));
