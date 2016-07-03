'use strict';

const google = require('googleapis');
const debug = require('debug')('demo-archiejs-gdocs');
const promisify = require('es6-promisify');

let GDocs = module.exports = function(config, deps) {
  this.sheets = google.sheets('v4');
}

GDocs.prototype.readReport = function(auth, filename) {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
    }, function(err, response) {
      if (err) {
        return reject(err);
      }
      let rows = response.values;

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        debug(row);
      }

      resolve(rows);    
    });
  });
}

GDocs.prototype.createReport = function(auth, filename, report) {
}
