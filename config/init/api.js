var path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var config = require('./../env'),
    myexpress = require('./express');

module.exports.init = function(archie){
    var app = myexpress.init(config);

    // add shortcuts to app
    app.services = archie.services;
    app.db = archie.services.db;

    // NOTE: ncomment to use default User authentication provided in Archiejs

    // setup local strategy
    var User = app.db.User; // hardcoded to use user
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // listen to port
    app.listen(config.http.port, function(err){
        if(err) throw err;
        console.log('listing at ' + config.http.port);
    });
}
