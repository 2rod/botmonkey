'use strict';

const hbs = require('koa-hbs');
const config = require('../nconf');

hbs.registerHelper('if_eq', function if_eq (a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  }
  return opts.inverse(this);
});

hbs.registerHelper('copyright_year', (opts) => {
  return new Date().getFullYear();
});

hbs.registerHelper('get_name', (opts) => {
  return config.SITE_NAME;
});

hbs.registerHelper('get_analytics', (opts) => {
  if (config.SITE_ANALYTICS) {
    return config.SITE_ANALYTICS;
  }
});

hbs.registerHelper('has_analytics', function has_analytics (opts) {
  const fnTrue = opts.fn;
  const fnFalse = opts.inverse;
  return (config.SITE_ANALYTICS && config.SITE_ANALYTICS !== false)
      ? fnTrue()
      : fnFalse();
});

hbs.registerHelper('has_fb_sdk', function has_fb_sdk (opts) {
  const fnTrue = opts.fn;
  const fnFalse = opts.inverse;
  return (config.FB_SDK_ENABLE !== false)
      ? fnTrue()
      : fnFalse();
});

hbs.registerHelper('get_fb_page_name', (opts) => {
  if (config.FB_SDK_ENABLE) {
    return config.FB_PAGE_NAME;
  }
});

hbs.registerHelper('get_fb_page_title', (opts) => {
  if (config.FB_SDK_ENABLE) {
    return config.FB_PAGE_TITLE;
  }
});

hbs.registerHelper('get_fb_app_id', (opts) => {
  if (config.FB_SDK_ENABLE) {
    return config.FB_APP_ID;
  }
});

hbs.registerHelper('get_fb_page_id', (opts) => {
  if (config.FB_SDK_ENABLE) {
    return config.FB_PAGE_ID;
  }
});
