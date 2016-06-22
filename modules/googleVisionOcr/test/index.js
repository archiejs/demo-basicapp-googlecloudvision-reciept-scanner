'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var testApp = require('./archie-unit');

describe('Plugin cloudvisionOcr Testcases:', function(){

  var scanner;

  before(function(done){
    testApp(function(err, archie) {
      scanner = archie.getService("ScanReceipt");
      done();
    });
  });

  it('#test faded pink recipt', function(done){
    scanner.detectAmountInRecipt('./test/image1.jpg')
    .then(({ result, amount }) => {
      console.log('result:', JSON.stringify(result[0].desc, null, 2));
      should.exist(result, "Result should exist");
      amount.should.equal(38.00, "Incorrect amount");
      done();
    })
    .catch((err) => done(err));
  });

  it('#test half recipt', function(done){
    scanner.detectAmountInRecipt('./test/image2.jpg')
   .then(({result, amount}) => {
      console.log('result:', JSON.stringify(result[0].desc, null, 2));
      should.exist(result, "Result should exist");
      amount.should.equal(184.00, "Incorrect amount");
      done();
    });
  });

  it('#tests recipt in a link', function(done) {
    scanner.detectAmountInRecipt("https://en.wikipedia.org/wiki/Receipt#/media/File:ReceiptSwiss.jpg")
    .then(({ result, amount }) => {
      console.log('result:', JSON.stringify(result[0].desc, null, 2));
      should.exist(result, "Result should exist");
      done();
    })
    .catch((err) => {
      console.error(err);
      done(err)
    });
  });

});
