'use strict';

var readline = require('readline');

var drive;
var scanner;
var googAuthToken;
var auth;
var readline;

var setup = function(options, imports) {
  drive = imports.GoogleDrive;
  scanner = imports.ScanReceipt;
  googAuthToken = imports.googleAuthToken;
  readline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // 1. Get the token
  // 2. Get the drive directory
  // 3. Prepare list of files to scan
  // 4. Prepare an output.txt in the same folder
};

function getTokenFromUser(done) {
  googAuthToken(function(_auth){
    auth = _auth;
    done();
  });
}

function getTaskDetailsFromUser(done) {
  var data = {};
  new Promise()
    .then(function(done, fail) {
      readline.question('What is the month on the reciepts (1-12) : ', function(month) {
        if(month) {
          data.month = month;
        }
        done();
      });
    })
    .then(function(done, fail) {
      readline.question('What is the year on reciepts (YY) : ', function(year) {
        if(year) {
          data.year = year;
        }
        done();
      });
    });
}

function getFilesFromDrive() {
}

function doScanNewReciepts() {
}

function doPrepareReport() {
}
