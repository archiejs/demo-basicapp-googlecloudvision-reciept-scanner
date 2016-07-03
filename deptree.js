'use strict';

var config = require('./config/env');

// individual modules and options

exports.googleAuth = "modules/googleauth";

exports.googleDrive = "modules/googledrive";

exports.googleVision = {
  packagePath: "modules/googlevisionOcr",

  // options
  keyFilename: config.google.keyFilename,
  projectId: config.google.projectId
};

exports.commandline = "modules/commandline";

exports.caches = "modules/caches";

/*
 * Common modules are common across sub-projects.
 * Ex: db module, analytics module are contendors.
 */

exports.common = [
  {
    "packagePath": "models",
    "packageEnhancer": "mongodb",
    "server": config.db
  }
];

// main app

exports.app = 
  [
    exports.googleAuth,
    exports.googleDrive,
    exports.googleVision,
    exports.commandline,
    exports.caches
  ];


// microservers - empty

module.exports = exports;
