'use strict';

const readline = require('readline');
const promisify = require('es6-promisify');
const debug = require('debug')('demo-archiejs-cmdline');

var auth;
var drive;
var scanner;
var question;
var details = {};

module.exports = function setup(options, deps) {
  var obj = this;

  auth = deps.GoogleCmdAuth;
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
  var now = new Date();
  var thisMonth = now.getMonth();
  var thisYear = now.getYear() - 100;
  return Promise.resolve()
    .then(() => question(`What is the month on the reciepts (1-12) : [${thisMonth}] `))
    .then((month) => { details.month = month || thisMonth; })
    .then(() => question(`What is the year on reciepts (YY) : [${thisYear}] `))
    .then((year) => { details.year = year || thisYear; })
    .then(() => question('What is the name of the google drive folder to scan : [Receipts] '))
    .then((folder) => { details.folderName = folder || 'Receipts' });
}

function getFilesFromDrive() {
  debug('getFilesFromDrive');
  return new Promise((resolve, reject) => {
    drive.findFolderIdFromName(auth, details.folderName, function(err, result){
      if(err) {
        return reject(err);
      }
      details.folderId = result.shift().id
      resolve(details.folderId);
    });
  })
  .then((folderId) => {
    drive.findImageFiles(auth, folderId, function(err, files) {
      if (err) {
        throw(err);
      }

      console.log('Files:');
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        // file url is
        console.log('%s (%s, %s)', file.name, file.id, file.webViewLink);
      }

      return(files);
    });
  });
}

function doScanNewReciepts() {
  debug('doScanNewReciepts');
}

function doPrepareReport() {
  debug('doPrepareReport');
}
