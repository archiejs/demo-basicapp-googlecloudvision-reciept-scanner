'use strict';

exports = module.exports = function(app) {

    app.post('/v1/login', userController.login);
    app.post('/v1/logout', userController.logout);
    app.post('/v1/register', userController.register);

    app.all('/v1/*', userController.checkAuth);

}
