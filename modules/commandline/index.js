'use strict';

var readline = require('readline');

var drive;
var scanner;
var googAuthToken;
var auth;
var readline;

var setup = function(options, deps, ready) {
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

  var data = {};

  new Promise((resolve) => {
    getTokenFromUser(resolve);
  }).then((auth) => {
    data.auth = auth;
    return new Promise((resolve) => {
      getTaskDetailsFromUser(resolve);
    });
  }).then((resolve) => {
    return new Promise((resolve) => {
      getFilesFromDrive(resolve);
    });
  }).then(() => {
    ready();
  });
  
};

function getTokenFromUser(resolve) {
  console.log('getTokenFromUser');
  googAuthToken(function(_auth){
    auth = _auth;
    resolve(auth);
  });
}

function getTaskDetailsFromUser(done) {
  console.log('getTaskDetailsFromUser');
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

function getFilesFromDrive(resolve) {
  console.log('getFilesFromDrive');
  resolve();
}

function doScanNewReciepts() {
  console.log('doScanNewReciepts');
}

function doPrepareReport() {
  console.log('doPrepareReport');
}
