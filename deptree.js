'use strict';

var config = require('./config/env');

// Package dependencies

/*
 * Common modules are common across sub-projects.
 * Ex: db module, analytics module are contendors.
 */

var common = [
  {
    "packagePath": "models",
    "packageEnhancer": "mongodb",
    "server": config.db
  }
];

// main app

var app = module.exports.app = []
  .concat(common);
