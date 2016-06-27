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
    scanner.detectText('./test/image1.jpg')
    .then(result => scanner.parseReceipt(result))
    .then(({ result, amount }) => {
      console.log('result:', JSON.stringify(result[0].desc, null, 2));
      should.exist(result, "Result should exist");
      amount.should.equal(38.00, "Incorrect amount");
      done();
    })
    .catch((err) => done(err));
  });

  it('#test half recipt', function(done){
    scanner.detectText('./test/image2.jpg')
    .then(result => scanner.parseReceipt(result))
    .then(({result, amount}) => {
      console.log('result:', JSON.stringify(result[0].desc, null, 2));
      should.exist(result, "Result should exist");
      amount.should.equal(184.00, "Incorrect amount");
      done();
    });
  });

  it('#tests recipt in a link', function(done) {
    scanner.detectText("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/1024px-ReceiptSwiss.jpg")
    .then(result => scanner.parseReceipt(result))
    .then(({ result, amount }) => {
      console.log('result:', JSON.stringify(result[0].desc, null, 2));
      should.exist(result, "Result should exist");
      done();
    })
    .catch((err) => {
      console.error(`${err} .. ${err.stack}`);
      done(err)
    });
  });

});
