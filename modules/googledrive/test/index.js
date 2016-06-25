'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
const debug = require('debug')('demo-archiejs-gdrive-test');

var testApp = require('./archie-unit');

describe('Google drive Testcases: ', function() {

  var tokenService;
  var driveService;

  before(function(done){
    this;
    testApp(function(err, archie) {
      tokenService = archie.getService("GoogleCmdAuth");
      driveService = archie.getService("GoogleDrive");
      done();
    });
  });

  it('should find folder with Receipts name', function(done) {
    tokenService.authorize()
      .then((auth) => {
        driveService.findFolderIdFromName(auth, 'Receipts');
      })
      .then(result => {
        debug(result);
      })
      .then(done, done); // ok, error
  });

  it('should list files in google drive', function(done) {
    tokenService.authorize()
      .then(driveService.findImageFiles)
      .then((files) => {
        debug(files);
      })
      .then(done, done); // ok, error
  });

  it('should list files in Receipt folder in google drive', function(done) {
    tokenService.authorize()
      .then((auth) => driveService.findImageFiles(auth, '0B6AH_WUpS8TnQ0pXc3hmZDQxWkk'))
      .then((files) => {
        debug(files);
      })
      .then(done, done); // ok, error
  });

  it('should download file to /tmp folder from google drive', function(done) {
    tokenService.authorize()
      .then((auth) => driveService.getFileContent(auth, '0B6AH_WUpS8TnbGFHaWZuOEtMM2M'))
      .then((file) => {
        debug(file);
      })
      .then(done, done); // ok, error
  });

});
