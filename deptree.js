'use strict';

var config = require('./config/env');

// individual modules

exports.testUtils = "modules/testUtils";

exports.googleDrive = "modules/googleDrive";

exports.googleVision = "modules/googleVisionOcr";

exports.commandline = "modules/commandline";

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
    exports.googleDrive,
    exports.googleVision,
    exports.commandline
  ]
  .concat(exports.common);

// microservers - empty

module.exports = exports;
