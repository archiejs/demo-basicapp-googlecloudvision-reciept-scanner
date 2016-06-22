'use strict';

const google = require('googleapis');
const googleAuth = require('google-auth-library');
const promisify = require('es6-promisify');
const service = google.drive('v3');

const filesQuery = promisify(service.files.list, service.files);

let GDrive = module.exports = function(config, deps) {
};

/**
 * Lists files in a folder.
 *
 * @params {json} auth - The authentication information of the user
 * @params {json} folder - The folder we are iterating
 *
 */
GDrive.prototype.findImageFiles = function(auth, folderId) {
  console.log("findImageFiles");
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

  return filesQuery(query);
}

GDrive.prototype.findFolderIdFromName = function(auth, name) {
  console.log("findFolderIdFromName");

  var q = `name='${name}' and mimeType='application/vnd.google-apps.folder'`;

  var query = {
    auth,
    q,
    fields: "files(id, name, webViewLink)"
  }
  
  return filesQuery(query);
}
