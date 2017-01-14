'use strict';

const config = require('./config.json');

const app = require('./index.js').app;
const passport = require('./index.js').passport;
const Router = require('koa-router');

const routes = new Router();

const main = require('./controllers/main.js');
const account = require('./controllers/account.js');
const userCtrl = require('./controllers/userCtrl.js');

// routes

routes.get('/', main.index);

// for passport
routes.get('/login', account.login);
routes.get('/logout', account.logout);
routes.get('/account', account.index);

// you can add as many strategies as you want
routes.get('/auth/github',
  passport.authenticate('github')
);

routes.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/account',
    failureRedirect: '/'
  })
);

// user routes
routes.get('/users', userCtrl.getAllUsers);
routes.get('/users/:user_type', userCtrl.getUsersByType);
routes.get('/user/:medical_number', userCtrl.getUserByMedicalId);
routes.get('/user/id/:id', userCtrl.getUserById);
routes.post('/user/search/fullname', userCtrl.getUserByFullName);
routes.get('/users/:user_type/:gender', userCtrl.getUsersByGender);
routes.post('/user/add', userCtrl.addUser);
routes.put('/user/:medical_number', userCtrl.updateUserByMedicalNum);
routes.delete('/user/:medical_number', userCtrl.deleteUser);

app.use(routes.middleware());
