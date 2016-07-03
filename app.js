'use strict';

var Archie = require('archiejs');
require('./config/common/enhancers.js'); // Load all enhancers

// Load the app's dependency tree

var deptree = require('./deptree');
var theAppTree = deptree.app;

if(!Array.isArray(theAppTree)) {
  throw new Error(theApp + ' config does not export an ARRAY.')
}

// Setup the app

var tree = Archie.resolveConfig(theAppTree, process.cwd());

Archie.createApp(tree, function(err, archie) {
    if(err){
        throw err;
    }

    require('./config/common/welcome');
    process.exit(0);
});
