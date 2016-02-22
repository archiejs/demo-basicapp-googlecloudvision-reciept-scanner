'use strict';

exports.login = function(req, res)
{
    var user = req.user;
    var userJ = {
        username: user.username,
        email: user.email,
        fullname: user.fullname
    };
    res.status(200).send(userJ);
}

exports.logout = function(req, res)
{
    req.logout();
    res.sendStatus(200);
}
    
exports.register = function(req, res)
{
    var User = req.app.services.db.User;
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        fullname: req.body.fullname
    });
    User.register(
        user,
        req.body.password,
        function(e) {
            if (e) { 
                console.log('error while user register!', e);
                return res.status(400).send({ error: e.toString() });
            }
            res.sendStatus(200);
        }
    );
}

exports.checkAuth = function(req, res, next){
    if(!req.user){
        return res.sendStatus(404);
    }
    next();
}
