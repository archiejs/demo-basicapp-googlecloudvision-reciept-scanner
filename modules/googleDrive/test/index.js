'use strict';

var secret = require('./../../../config/secrets/google-local.json');
var token = require('./token');

var GDrive = require('./../');
var gdrive = new GDrive();

var auth;

describe('Google drive Testcases: ', function() {

  before(function(done) {
    this.timeout(15000);
    token(function(_auth) {
      auth = _auth;
      done();
    });
  });

  it('should list files in google drive', function(done) {
    gdrive.listFiles(auth, done);
  });

});


