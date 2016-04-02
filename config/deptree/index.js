var path = require('path');

// the app we are currently running
var pluginName = process.argv[2] || 'default';
var appPlugins = require(path.join(process.cwd(), 'config', 'plugins', pluginName)) || {};

if(!Array.isArray(appPlugins)){
    throw new Error(pluginName + ' config does not export an ARRAY.')
}

// Get the default config
var defaultPlugins = require('./common');

// Merge config files
var plugins = appPlugins.concat(defaultPlugins);

module.exports = plugins;

