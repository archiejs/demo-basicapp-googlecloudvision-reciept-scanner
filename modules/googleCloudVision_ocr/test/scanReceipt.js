'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var dummyOptions = {};
var dummyImports = {};
var ScanReceipt = require('./../scanReceipt.js');
var instScanReceipt;

describe('Plugin cloudvisionOcr Testcases:', function(){
    
    before(function(){
        // create an instance of the plugin and pass it
        // dummy options and imports
        instScanReceipt = new ScanReceipt(dummyOptions, dummyImports);
    });
    
    afterEach(function(){
    });

    it('#tests something', function(done){
        // add testcase for instScanReceipt here
        done('Todo: please implement your first testcase');
    });

});
