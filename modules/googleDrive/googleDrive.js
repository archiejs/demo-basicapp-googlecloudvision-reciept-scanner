'use strict';

var google = require('googleapis');
var googleAuth = require('google-auth-library');

var GDrive = module.exports = function(config, deps) {
};

GDrive.prototype.listFiles = function(auth, done) {
  var service = google.drive('v3');
  service.files.list({
    auth: auth,
    pageSize: 10,
    fields: "nextPageToken, files(id, name, webViewLink)"
  }, function(err, response) {
    if (err) {
      console.error("Error in API");
      console.error(err);
      return;
    }
    var files = response.files;
    if (files.length == 0) {
      console.log('No files found');
    } else {
      console.log('Files:');
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        // file url is
        console.log('%s (%s, %s)', file.name, file.id, file.webViewLink);
      }
    }
    done();
  });
}
