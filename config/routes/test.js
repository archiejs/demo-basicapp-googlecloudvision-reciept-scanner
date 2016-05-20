'use strict';

var passport = require('passport');

exports = module.exports = function(app) {

    // gets
    app.get('/test/welcome', welcome);
    app.get('/test/success', success);
    app.get('/test/failure', failure);

    // passport
    app.get('/test/auth/google', passport.authenticate('google', { scope : ['email'] }));
    app.get('/google/auth/callback', passport.authenticate('google', {
      successRedirect : '/test/success',
      failureRedirect : '/test/failure'
    }));

}

// controllers

var welcome = function(req, res)
{
    res.send(
      '<html>\
        <head>\
        <title>Test Google Auth</title>\
        </head>\
        <body>\
        <a href="/test/auth/google">Login with google</a>\
        </body>\
      </html>'
    );
}

var success = function(req, res)
{
    res.send("success");
}

var failure = function(req, res)
{
    res.send("failure");
}
