var path = require('path'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy;

var config = require('./../env'),
    myexpress = require('./express');

module.exports.init = function(archie){
    var app = myexpress.init(config);

    // add shortcuts to app
    app.services = archie.services;
    app.db = archie.services.db;
    var User = app.db.User; // hardcoded to use user

    // setup strategy
    passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    }, function(accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        { googleId: profile.id },
        function (err, user) {
          return done(err, user);
        }
      );
    }));

    passport.serializeUser(User.serializeUser);
    passport.deserializeUser(User.deserializeUser);

    // listen to port
    app.listen(config.port, function(err){
        if(err) throw err;
        console.log('listing at ' + config.port);
    });
}
