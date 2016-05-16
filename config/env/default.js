'use strict';

var gconf = require('./../secrets/google-local.json');

module.exports = {
  app: {
    title: 'Google recipt scanner',
    description: 'Scan recipts in google drive and write to google spreadsheet'
  },

  port: process.env.PORT || 3000,
  sessionCookie: {
    maxAge: 24 * (60 * 60 * 1000),
    httpOnly: true,
    secure: false
  },
  sessionSecret: process.env.SESSION_SECRET || 'youshouldchangethistosomethingsecret',

  // google settings
  google: {
    clientID: gconf.web.client_id,
    clientSecret: gconf.web.client_secret,
    callbackURL: gconf.web.redirect_uris[0]
  }
};
