'use strict';

const config = require('./nconf');

const koa = require('koa');
const hbs = require('koa-hbs');
const serve = require('koa-static-folder');

// for passport support
const session = require('koa-generic-session');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const app = koa();

exports.app = app;
exports.passport = passport;

// the auth model for passport support
require('./models/auth');

// misc handlebars helpers
require('./helpers/handlebars');

// trust proxy
app.proxy = true;

// sessions
app.keys = [config.SITE_SECRET];
app.use(session());

// body parser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
app.use(passport.session());

// statically serve assets
app.use(serve('./assets'));

// load up the handlebars middlewear
app.use(hbs.middleware({viewPath: `${__dirname}/views`, layoutsPath: `${__dirname}/views/layouts`, partialsPath: `${__dirname}/views/partials`, defaultLayout: 'main'}));

app.use(function* error(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

require('./routes');

const db = require('./helpers/db');

db.on('error', console.error.bind(console, 'error connecting'));
db.once('open', () => {
  app.listen(config.PORT);
  console.log(`${config.SITE_NAME} is now running at http://${config.HOSTNAME}:${config.PORT}/`);
});

process.on('SIGINT', function exit() {
  process.exit();
});
