var config = require('./../env'),
    express = require('./express'),
    passport = require('./passport');

module.exports.startApp = function(archie){
    var app = express.init(config);
    passport.init(archie.services.db, config);

    // add shortcuts to app
    app.services = archie.services;
    app.db = archie.services.db;

    // listen to port
    app.listen(config.port, function(err){
        if(err) throw err;
        console.log('listing at ' + config.port);
    });
}
