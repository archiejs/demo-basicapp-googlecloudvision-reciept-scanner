var config = require('./../env'),
    appInit = require('./express'),
    socialInit = require('./social');

module.exports.startApp = function(archie){
    var app = appInit.init(config);
    socialInit.init(archie.services.db, config);

    // add shortcuts to app
    app.services = archie.services;
    app.db = archie.services.db;

    // listen to port
    app.listen(config.port, function(err){
        if(err) throw err;
        console.log('listing at ' + config.port);
    });
}
