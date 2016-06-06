'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var testApp = require('./archie-unit');

describe('Plugin cloudvisionOcr Testcases:', function(){

  var scanner;

  before(function(done){
    // create an instance of the plugin and pass it
    // dummy options and imports
    testApp(function(err, archie) {
      scanner = archie.getService("ScanReceipt");
      done();
    });
  });

  afterEach(function(){
  });

  it('#tests something', function(done){
    scanner.detectLabels('./test/image2.jpg', done);
  });

});
