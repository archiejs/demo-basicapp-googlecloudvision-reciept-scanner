'use strict';

var config = require('./config/env');

// individual modules

exports.testUtils = {
    "packagePath": "modules/testUtils"
  };

exports.googleDrive = "modules/googleDrive";

exports.googleVision =
  {
    "packagePath": "modules/googleVisionOcr"
  };

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
    exports.googleVision
  ]
  .concat(exports.common);

// microservers - empty

module.exports = exports;
