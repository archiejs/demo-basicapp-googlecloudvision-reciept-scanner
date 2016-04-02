'use strict';

var Archie = require('./archiejs');

var isAPIEndpoint = (!process.argv[2]) || (process.argv[2] === 'default');

// Load plugin configs
var dependencies = require('./config/deptree');
var tree = Archie.resolveConfig(dependencies, process.cwd());

Archie.createApp(tree, function(err, archie) {
    if(err){
        throw err;
    }

    if ( isAPIEndpoint ) {
        require('./config/init/api').init(archie);
    }
    require('./config/init/welcome');
});
