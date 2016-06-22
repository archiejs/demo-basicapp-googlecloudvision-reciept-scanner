'use strict';

const GCloud = require('gcloud');
const promisify = require('es6-promisify');
const debug = require('debug')('demo-archiejs-scanner');

var ScanDoc = function(options, deps) {
  const gcloud = GCloud({ projectId: options.projectId });
  this.vision = gcloud.vision();
}

ScanDoc.prototype.detectAmountInRecipt = function(inputFile) {
  // Make a call to the Vision API to detect the labels
  
  return new Promise((resolve, reject) => {
    debug(`scan ${inputFile}`);
  
    this.vision.detectText(inputFile, { verbose: true },
      function(err, result){
        err = err || result.errors;
        if(err) {
          return reject(err);
        }

        debug(result);

        var desc = result[0].desc;
        var amts =
          desc
          .split(/[\n ,]+/)
          .filter( function(amt) {
            return amt.match("[0-9]\\.[0-9][0-9]$") != null; // all amounts end with .XX
          })
          .map( function(amt) {
            return parseFloat(amt);  // convert string to float
          });
  
        var sorted = amts.sort(function(a,b) { return a-b; }); // asc
        var length = sorted.length-1; // max (usually the bill amount)
        var start = 0; // min
  
        if(sorted[start] < 0) {
          length--; // choose second largest value
        }
  
        var amount = sorted[length];
  
        return resolve({ result, amount });
      }
    );

  });

}
  
module.exports = ScanDoc;
