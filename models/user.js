'use strict';

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var walletSchema = require('./wallet');
var merchantSchema = require('./merchant');

var userSchema = new mongoose.Schema({
    // auth related

    mobile_number: { type: String, unique: true },
    password: String,
    mpin: String,

    // user info

    email: { type: String, unique: true },
    name: {
      first: String,
      last: String,
      full: String
    },
    dob: Date,

    // roles of the user (beyond a wallet user)

    roles: {
      wallet: { type: walletSchema },
      merchant: { type: merchantSchema }
    },

    // other wallets of the user... todo
    //
    // wallets: {
    //   metro_wallet: {},
    //   bus_wallet: {}
    // }

    // social logins of the user... todo
    // 
    // social: {
    //   twitter: {},
    //   linkedin: {}
    // }

    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    updatedOn: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now }
});

//Schema.index({ });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
