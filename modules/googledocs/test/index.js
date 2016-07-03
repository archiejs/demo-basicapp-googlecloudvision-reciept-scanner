'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
const debug = require('debug')('demo-archiejs-gdrive-test');

var testApp = require('./archie-unit');

describe('Google drive Testcases: ', function() {

  var tokenService;
  var docsService;

  before(function(done){
    this;
    testApp(function(err, archie) {
      tokenService = archie.getService("GoogleCmdAuth");
      docsService = archie.getService("GoogleDocs");
      done();
    });
  });

  it('should find document with name Receipts', function(done) {
    tokenService.authorize()
      .then((auth) => {
        return docsService.findReports(auth, 'Receipts');
      })
      .then(result => {
        debug(result);
      })
      .then(done, done); // ok, error
  });

  it('should list files in google docs', function(done) {
  });

});
