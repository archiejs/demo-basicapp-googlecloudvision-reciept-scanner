'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var testApp = require('./archie-unit');

describe('Google drive Testcases: ', function() {
  
  var tokenService;
  var driveService;

  before(function(done){
    this.timeout(15000);
    testApp(function(err, archie) {
      tokenService = archie.getService("GoogleAuthToken");
      driveService = archie.getService("GoogleDrive");
      done();
    });
  });

  it('should list files in google drive', function(done) {
    this.timeout(15000);
    tokenService.authorize(function(auth){
      driveService.listFiles(auth, done);
    });
  });

});
