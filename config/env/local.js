'use strict';

// Rename this file to local.js for having a local configuration variables that
// will not get commited and pushed to remote repositories.
// Use it for your API keys, passwords, etc.

const join = require('path').join;

module.exports = {
  // google settings
  google: {
    projectId: 'receiptscanner',
    credentials: join(__dirname, '..', 'secrets', 'scanapp-creds.json'),
    keyFilename: join(__dirname, '..', 'secrets', 'scanapp-pkey.json'),
    scopes: [
      'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/drive.readonly'
    ]
  }
};
