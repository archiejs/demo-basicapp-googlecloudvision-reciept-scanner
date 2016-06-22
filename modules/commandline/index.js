'use strict';

const readline = require('readline');
const promisify = require('es6-promisify');
const debug = require('debug')('demo-archiejs-cmdline');

var auth;
var drive;
var scanner;
var question;

module.exports = function setup(options, deps) {
  debug('commandline init');
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

  // a json `details` is used to pass values between functions in this promise structure
  let result =
    auth.authorize()
    .then((_auth) => { auth = _auth; })
    .catch(err => {
      console.error('you might need to delete the file .drive-nodejs-quickstart.json , if this is a timeout error');
      process.exit(-1);
    })
    .then(getTaskDetailsFromUser) // adds month, year and folder name to details
    .then(getFilesFromDrive)  // adds folder id and files to details
    .then(doScanNewReceipts) // scans new receipts
    .then(() => { return obj; })
    .catch(err => {
      console.error(err);
      process.exit(-1);
    });

  return result;
};

function getTaskDetailsFromUser() {
  debug('getTaskDetailsFromUser');
  var details = {};
  var now = new Date();
  var thisMonth = now.getMonth();
  var thisYear = now.getYear() - 100;
  return Promise.resolve()
    .then(() => question(`What is the month on the reciepts (1-12) : [${thisMonth}] `))
    .then((month) => { details.month = month || thisMonth; })
    .then(() => question(`What is the year on reciepts (YY) : [${thisYear}] `))
    .then((year) => { details.year = year || thisYear; })
    .then(() => question('What is the name of the google drive folder to scan : [Receipts] '))
    .then((folder) => { details.folderName = folder || 'Receipts' })
    .then(() => { return details; })
    .catch(err => { console.error(err); process.exit(-1);});
}

function getFilesFromDrive(details) {
  debug('getFilesFromDrive');
  return drive.findFolderIdFromName(auth, details.folderName)
  .then(result => {
    details.folderId = result.id
    return details.folderId;
  })
  .then((folderId) => drive.findImageFiles(auth, folderId))
  .then(page => {
    details.files = page.files;
    debug(`Found ${page.files.length} files`);
    return details.files.map(item => item.webViewLink);
  });
}

function doScanNewReceipts(files) {
  debug('doScanNewReciepts');
  var files = files.slice(0,1);
  return Promise.all(
    files.map(file => scanner.detectAmountInRecipt(file))
  )
  .then(contents => {
    console.log(contents.result);
    console.log('--------');
    console.log(contents.amount);
  });
}

function doPrepareReport() {
  debug('doPrepareReport');
}
