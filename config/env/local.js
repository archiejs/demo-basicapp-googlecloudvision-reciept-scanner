'use strict';

// Rename this file to local.js for having a local configuration variables that
// will not get commited and pushed to remote repositories.
// Use it for your API keys, passwords, etc.

const join = require('path').join;
const gconf = require('./../secrets/scanapp-local.json');

module.exports = {
  // google settings
  google: {
    clientID: gconf.web.client_id,
    clientSecret: gconf.web.client_secret,
    projectId: gconf.web.project_id,
    callbackURL: gconf.web.redirect_uris[0],
    keyFilename: join(__dirname, '..', 'secrets', 'scanapp-pkey.json')
  }
};
