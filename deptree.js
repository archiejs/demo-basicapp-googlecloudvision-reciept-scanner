'use strict';

var config = require('./config/env');

// individual modules and options

exports.googleAuth = {
  packagePath: "modules/googleauth",
  credentials: config.google.credentials,
  scopes: config.google.scopes
};

exports.googleDrive = "modules/googledrive";

exports.googleVision = {
  packagePath: "modules/googlevisionOcr",
  keyFilename: config.google.keyFilename,
  projectId: config.google.projectId
};

exports.googleDocs = "modules/googleDocs";

exports.commandline = "modules/commandline";

exports.caches = "modules/caches";

// main app

exports.app = 
  [
    exports.googleAuth,
    exports.googleDrive,
    exports.googleVision,
    exports.googleDocs,
    exports.commandline,
    exports.caches
  ];


// other microservices - none

module.exports = exports;
