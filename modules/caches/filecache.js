const fs = require('fs');
const promisify = require('es6-promisify');
const debug = require('debug')('demo-archiejs-caches');

const fsreadPromise = promisify(fs.readFile, fs);
const fswritePromise = promisify(fs.writeFile, fs);

var FC = module.exports = function() {
}

FC.prototype.get = function(id) {
  debug(`get ${id}`);
  let file = this.resolveId(id);
  return this.exists(id)
    .then(found => {
      if(found)
        return fsreadPromise(file);
    });
}

FC.prototype.exists = function(id) {
  debug(`exists ${id}`);
  let file = this.resolveId(id);
  return new Promise(resolve => {
    fs.exists(file, resolve);
  });
}

FC.prototype.put = function(id, data) {
  debug(`put ${id}`);
  let file = this.resolveId(id);
  return fswritePromise(file);
}

FC.prototype.syncNotCached = function(ids, syncPromiseFn) {
  debug("syncNotCached");
  let cache = this;
  return Promise.all(
    ids.map(id =>
      {
        return cache.exists(id)
          .then((exists) => {
            if (!exists)
              return syncPromiseFn(id, cache.resolveId(id) ); // not found ... sync
          });
      }
    )
  );
}

// resolve an id to a file
FC.prototype.resolveId = function(id) {
  return `/tmp/${id}`;
}
