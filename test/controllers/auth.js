'use strict';

exports.welcome = function(req, res)
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

exports.success = function(req, res)
{
    res.send("success");
}
