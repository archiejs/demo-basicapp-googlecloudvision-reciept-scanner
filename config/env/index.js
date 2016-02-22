var _ = require('lodash'),
    path = require('path');

// Get the current config
var envFile = process.env.NODE_ENV || 'local'; // default
var environmentConfig = require(path.join(process.cwd(), 'config', 'env', envFile)) || {};

// Get the default config
var defaultConfig = require('./default');

// Merge config files
var envConfig = _.merge(defaultConfig, environmentConfig);

// Get files (ex. routes)
envConfig.files = {
    routes: require('./routes.js')
};

module.exports = envConfig;
