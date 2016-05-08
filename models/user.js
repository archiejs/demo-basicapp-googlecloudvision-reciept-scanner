'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true },
    profile: {}, // profile info
    updatedOn: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now }
});

//Schema.index({ });

userSchema.statics.serializeUser = function(user, done) {
  done(null, user.googleId);
}

userSchema.statics.deserializeUser = function(googleId, done) {
  User.findOne({
    'googleId': googleId
  }, function(err, user) {
    if (!err) {
      done(null, user);
    } else {
      done(err);
    }
  });
}

module.exports = mongoose.model('User', userSchema);
