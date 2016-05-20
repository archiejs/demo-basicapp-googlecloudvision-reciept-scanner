var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports.init = function (db, config) {
    var User = db.User;

    // setup google

    passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    }, function(accessToken, refreshToken, profile, done) {
      // console.log(profile);
      var query = { googleId: profile.id };
      var docs = {
        googleId: profile.id,
        profile: {
          name: profile.displayName,
          email: profile.emails,
          gender: profile.gender
        } };
      var options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true };
      User.findOneAndUpdate(
        query,
        docs,
        options,
        function (err, user) {
          return done(err, user);
        }
      );
    }));

    passport.serializeUser(User.serializeUser);
    passport.deserializeUser(User.deserializeUser);

}
