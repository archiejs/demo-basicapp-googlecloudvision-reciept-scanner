'use strict';

exports = module.exports = function(app) {

  // gets
  app.get('/', (req, res) => { res.render('home.jade'); });

}

