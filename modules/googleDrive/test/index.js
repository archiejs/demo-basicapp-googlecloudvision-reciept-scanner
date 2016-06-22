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
        console.log(result);
        done();
      });
  }).timeout(15000);

  it('should list files in google drive', function(done) {
    tokenService.authorize()
      .then(driveService.findImageFiles)
      .then((files) => {
        console.log(files);
        done();
      })
      .catch(err => {
        console.log(err);
        process.exit(-1);
      });
  }).timeout(15000);

  it('should list files in Receipt folder in google drive', function(done) {
    tokenService.authorize()
      .then((auth) => driveService.findImageFiles(auth, '0B6AH_WUpS8TnQ0pXc3hmZDQxWkk'))
      .then((files) => {
        console.log(files);
        done();
      })
      .catch(err => {
        console.log(err);
        process.exit(-1);
      });
  }).timeout(15000);

});
