'use strict';

const google = require('googleapis');
const servicev3 = google.drive('v3');
const servicev2 = google.drive('v2');

const promisify = require('es6-promisify');
const fs = require('fs');

const request = require('request');
const debug = require('debug')('demo-archiejs-gdrive');

const filesQuery = promisify(servicev3.files.list, servicev3.files);

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
  debug("findImageFiles");
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
  debug("findFolderIdFromName");

  var q = `name='${name}' and mimeType='application/vnd.google-apps.folder'`;

  var query = {
    auth,
    q,
    fields: "files(id, name, webViewLink)"
  }
  
  return filesQuery(query);
}

GDrive.prototype.getFileContent = function(auth, fileIds) {
  if (typeof fileIds === 'string') {
    fileIds = [ fileIds ];
  }

  return Promise.all(
    fileIds.map(fileId => {
      return new Promise((resolve, reject) => {
        const filename = `/tmp/${fileId}`;
        const dest = fs.createWriteStream(filename);

        debug(`download started ${fileId}`);

        servicev2.files.get({
          auth,
          fileId,
          alt: 'media'
        })
        .on('end', function() {
          debug(`download complete ${fileId}`);
          resolve(filename);
        })
        .on('error', function(err) {
          debug(`download error ${fileId}`);
          reject(err);
        })
        .pipe(dest);

      });
    })
  );
}

