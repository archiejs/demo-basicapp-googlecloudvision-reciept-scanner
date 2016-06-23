'use strict';

const GCloud = require('gcloud');
const promisify = require('es6-promisify');
const debug = require('debug')('demo-archiejs-scanner');

var ScanDoc = function(options, deps) {
  const gcloud = GCloud({ projectId: options.projectId });
  this.vision = gcloud.vision();
}

ScanDoc.prototype.detectAmountInRecipt = function(image) {
  // Make a call to the Vision API to detect the labels
  
  return new Promise((resolve, reject) => {
    debug(`scan ${image}`);
  
    this.vision.detectText(image, { verbose: true }, // adds description field in result
      function(err, result){
        if(err || result.errors.length > 0) {
          return reject(err || result.errors[0]);
        }

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
