'use strict';

var readline = require('readline');

var auth;
var drive;
var scanner;
var readline;
var details = {};

module.exports = function setup(options, deps) {
  var obj = this;

  auth = deps.GoogleAuthToken;
  drive = deps.GoogleDrive;
  scanner = deps.ScanReceipt;
  readline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // 1. Get the token
  // 2. Get the drive directory
  // 3. Prepare list of files to scan
  // 4. Prepare an output.txt in the same folder

  return
    new Promise((resolve) => auth.authorize(resolve))
    .then((_auth) => { auth = _auth; })
    .then(() => getTaskDetailsFromUser)
    .then(() => getFilesFromDrive)
    .then(() => { return obj; });

};

function getTaskDetailsFromUser() {
  console.log('getTaskDetailsFromUser');
  /*
  return new Promise()
    .then((done, fail) => {
      readline.question('What is the month on the reciepts (1-12) : ', function(month) {
        if(month) {
          details.month = month;
        }
        done();
      });
    })
    .then((done, fail) => {
      readline.question('What is the year on reciepts (YY) : ', function(year) {
        if(year) {
          details.year = year;
        }
        done();
      });
    });
   */
}

function getFilesFromDrive() {
  console.log('getFilesFromDrive');
}

function doScanNewReciepts() {
  console.log('doScanNewReciepts');
}

function doPrepareReport() {
  console.log('doPrepareReport');
}
