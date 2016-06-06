'use strict';

//https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/vision/labelDetection.js

const GCloud = require('gcloud');

var ScanDoc = function(options) {
  const gcloud = GCloud({ projectId: options.projectId });
  this.vision = gcloud.vision();
}

ScanDoc.prototype.detectLabels = function(inputFile, callback) {
  // Make a call to the Vision API to detect the labels
  this.vision.detectLabels(inputFile, { verbose: true }, function (err, labels) {
    if (err) {
      return callback(err);
    }
    console.log('result:', JSON.stringify(labels, null, 2));
    callback(null, labels);
  });
}

module.exports = ScanDoc;
