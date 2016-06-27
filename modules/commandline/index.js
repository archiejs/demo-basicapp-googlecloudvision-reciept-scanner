'use strict';

const readline = require('readline');
const promisify = require('es6-promisify');
const PromisePool = require('es6-promise-pool')

const debug = require('debug')('demo-archiejs-cmdline');

const downloadConcurrency = 4; // gdrive -> /tmp folder
const uploadConcurrency = 2; // machine to cloud vision server

let auth;
let drive;
let scanner;
let cache;
let question;

module.exports = function setup(options, deps) {
  debug('commandline init');
  const obj = this;

  auth = deps.GoogleCmdAuth;
  drive = deps.GoogleDrive;
  scanner = deps.ScanReceipt;
  cache = deps.FileCache;

  const rl = readline.createInterface({
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
  let details = {};
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getYear() - 100;
  return Promise.resolve()
    .then(() => question(`What is the month on the reciepts (1-12) : [${thisMonth}] `))
    .then((month) => { details.month = month || thisMonth; })
    //.then(() => question(`What is the year on reciepts (YY) : [${thisYear}] `))
    //.then((year) => { details.year = year || thisYear; })
    .then(() => question('What is the name of the google drive folder to scan : [Receipts] '))
    .then((folder) => { details.folderName = folder || 'Receipts' })
    .then(() => { return details; })
    .catch(err => { console.error(err); process.exit(-1);});
}

function getFilesFromDrive(details) {
  debug('getFilesFromDrive');
  let files = [];
  let queue = [];

  // rate limiting sync promises - queue

  let syncNext = function() {
    if (queue.length > 0) {
      let {id, dest} = queue.shift();
      return drive.getFileContent(auth, id, dest);
    }
  };

  let syncPool = new PromisePool(syncNext, downloadConcurrency);

  // normal execution flow

  return drive.findFolderIdFromName(auth, details.folderName)
  .then(result => {
    details.folderId = result.id
    return details.folderId;
  })
  .then((folderId) => drive.findImageFiles(auth, folderId))
  .then(page => {
    details.files = page.files;
    debug(`Found ${page.files.length} files`);
    files = details.files.map(item => item.id);
  })
  .then(() => {
    return cache.syncNotCached(files, (id, dest) => queue.push( { id, dest } )); // queue up files to be downloaded
  })
  .then(() => { return syncPool.start(); }) // download files
  .then(() => { return files; });
}

function doScanNewReceipts(files) {
  debug('doScanNewReciepts');

  // map ocr filename to original id
  let ocrs = {};
  files.forEach((id) => {
    let ocr = `${id}.txt`;
    let image = cache.resolveId(id);
    ocrs[ocr] = { image };
  });

  // scanning in a queue with file cache
  let queue = [];
  let scanNext = function() {
    if (queue.length > 0) {
      let {ocr, image, dest} = queue.shift();
      return scanner.detectText(image)
        .then((json) => {
          let text = JSON.stringify(json, null, 10);
          return cache.put(ocr, text); // add text to cache
        });
    }
  };

  let scanPool = new PromisePool(scanNext, uploadConcurrency);

  // put requests in cache
  return Promise.resolve(Object.keys(ocrs))
  .then((ocrKeys) => {
    return cache.syncNotCached(ocrKeys, (ocr, dest) => queue.push( Object.assign({dest, ocr}, ocrs[ocr]) ));
  })
  .then(() => { return scanPool.start(); }) // scan files and cache them
  .then(() => {
    // read everything from cache
    return Promise.all(Object.keys(ocrs).map(ocr => cache.get(ocr))); // read all from cache
  })
  .then((results) => {
    return results.map(result => JSON.parse(result));
  })
  .then((results) => {
    return results.map(result => scanner.parseReceipt(result));
  })
  .then(scans => {
    // add id's to scans
    for(let idx in scans) {
      scans[idx].fileId = files[idx];
    }

    // separate into good and bad scans
    let goodScans = scans.filter(item => { return item.amount != undefined; });
    let badScans = scans.filter(item => { return item.amount == undefined; });

    let item, id, title, amount, content;

    console.log("\n\nGood Scans:-\n");
    for(item of goodScans) {
      id = item.id;
      title = item.result[0].desc.slice(0, 15);
      amount = item.amount;
      console.log(`${id} \t\t ${title} \t\t ${amount}`);
    }

    console.log("\n\nBad Scans:-\n");
    for(item of badScans) {
      id = item.id;
      content = item.result[0].desc;
      console.log(`${id} \t\t ${content}`);
    }

  });
}

function doPrepareReport() {
  debug('doPrepareReport');
}
