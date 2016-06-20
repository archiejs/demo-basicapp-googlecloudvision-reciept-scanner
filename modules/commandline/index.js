'use strict';

const readline = require('readline');
const promisify = require('es6-promisify');
const debug = require('debug')('demo-archiejs-googleauth');

var auth;
var drive;
var scanner;
var question;
var details = {};

module.exports = function setup(options, deps) {
  var obj = this;

  auth = deps.GoogleAuthToken;
  drive = deps.GoogleDrive;
  scanner = deps.ScanReceipt;
  
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  question = promisify(function(question, callback) {
    rl.question(question, callback.bind(null, null));
  });

  // 1. Get the token
  // 2. Get the drive directory
  // 3. Prepare list of files to scan
  // 4. Prepare an output.txt in the same folder

  let result =
    new Promise((resolve) => auth.authorize(resolve))
    .then((_auth) => { auth = _auth; })
    .then(() => getTaskDetailsFromUser())
    .then(() => getFilesFromDrive())
    .then(() => { return obj; })

  return result;
};

function getTaskDetailsFromUser() {
  debug('getTaskDetailsFromUser');
  return Promise.resolve()
    .then(() => question('What is the month on the reciepts (1-12) : '))
    .then((month) => { details.month = month; })
    .then(() => question('What is the year on reciepts (YY) : '))
    .then((year) => { details.year = year; })
}

function getFilesFromDrive() {
  debug('getFilesFromDrive');
}

function doScanNewReciepts() {
  debug('doScanNewReciepts');
}

function doPrepareReport() {
  debug('doPrepareReport');
}
