'use strict';

var google = require('googleapis');
var googleAuth = require('google-auth-library');

var GDrive = module.exports = function(config, deps) {
};

/**
 * Lists files in a folder.
 *
 * @params {json} auth - The authentication information of the user
 * @params {json} folder - The folder we are iterating
 *
 * TODO use a generator
 */
GDrive.prototype.findImageFiles = function(auth, folderId, done) {
  if (typeof(folderId) == 'function') {
    done = folderId;
    folderId = null;
  }

  var q = "mimeType='image/jpeg'";
  if (folderId) {
    // look inside a specific folder
    q = `'${folderId}' in parents and ${q}`;
  }

  var query = {
    auth,
    q,
    pageSize: 10,
    fields: "nextPageToken, files(id, name, webViewLink)"
  }

  var service = google.drive('v3');

  service.files.list(query, function(err, response) {
    if (err) {
      console.error("Error in API");
      console.error(err);
    }
    done(err, response && response.files);
  });
}

GDrive.prototype.findFolderIdFromName = function(auth, name, done) {

  var q = `name='${name}' and mimeType='application/vnd.google-apps.folder'`;

  var query = {
    auth,
    q,
    fields: "files(id, name, webViewLink)"
  }

  var service = google.drive('v3');

  service.files.list(query, function(err, response) {
    if (err) {
      console.error("Error in API");
      console.error(err);
    }
    done(err, response && response.files);
  });
}
