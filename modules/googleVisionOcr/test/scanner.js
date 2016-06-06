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

  it('#test faded pink recipt', function(done){
    scanner.detectAmountInRecipt('./test/image1.jpg', function(err, result, amount){
      if(err) return done(err);
      should.exist(result, "Result should exist");
      amount.should.equal(38.00, "Incorrect amount");
      console.log('result:', JSON.stringify(result[0].desc, null, 2));
      done();
    });
  });

  it('#test half recipt', function(done){
    scanner.detectAmountInRecipt('./test/image2.jpg', function(err, result, amount){
      if (err) return done(err);
      should.exist(result, "Result should exist");
      amount.should.equal(184.00, "Incorrect amount");
      console.log('result:', JSON.stringify(result[0].desc, null, 2));
      done();
    });
  });
});
