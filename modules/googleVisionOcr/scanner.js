'use strict';

const GCloud = require('gcloud');

var ScanDoc = function(options) {
  const gcloud = GCloud({ projectId: options.projectId });
  this.vision = gcloud.vision();
}

ScanDoc.prototype.detectAmountInRecipt = function(inputFile, callback) {
  // Make a call to the Vision API to detect the labels
  this.vision.detectText(inputFile, { verbose: true },
    function(err, result){
      if(err) {
        return callback(err);
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

      return callback(null, result, amount);
    }
  );
}

module.exports = ScanDoc;
