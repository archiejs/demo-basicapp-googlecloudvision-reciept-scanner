var _ = require('lodash'),
    path = require('path');

// Get the current config
var envFilename = process.env.NODE_ENV || 'local'; // default
var envConfig = require('./' + envFilename) || {};

// Get the default config
var defaultConfig = require('./default');

// Merge config files
var appConfig = _.merge(defaultConfig, envConfig);

// Get files (ex. routes)
appConfig.files = {
    routes: require('./../routes')
};

module.exports = appConfig;
