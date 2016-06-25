const fs = require('fs');
const debug = require('debug')('demo-archiejs-caches');

var FC = module.exports = function() {
}

FC.prototype.get = function(id) {
  debug(`get ${id}`);
  return this.exists(id)
    .then((file) => {
      fs.readFile(file, (err, data) => {
        if (err) {
          throw err;
        } else {
          return data;
        }
      });
    });
}

FC.prototype.exists = function(id) {
  debug(`check exists ${id}`);
  let file = `/tmp/${id}`;
  return new Promise((resolve, reject) => {
    fs.exists(file, function(exists) {
      if (exists) {
        debug(`found ${file}`);
        resolve(file);
      } else {
        debug(`not found ${file}`);
        reject();
      }
    });
  });
}

FC.prototype.putStream = function(id) {
  debug(`putStream ${id}`);
  let file = `/tmp/${id}`;
  const dest = fs.createWriteStream(filename);
  return dest;
}

FC.prototype.put = function(id, data) {
  debug(`put ${id}`);
  let file = `/tmp/${id}`;
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) {
        reject(err);
      } else {
        resolve(file);
      }
    })
  });
}

FC.prototype.syncNotCached = function(ids, syncPromiseFn) {
  debug("syncNotCached");
  let cache = this;
  return Promise.all(
    ids.map(id =>
      {
        let hit = false;
        return cache.exists(id)
          .then(() => { hit = true; }) // found key
          .catch(() => syncPromiseFn(id)) // not found ... sync
          .then(content => {
            if(!hit) {
              return cache.put(id, content);
            }
          });
      }
    )
  );
}

FC.prototype.getLocation = function(id) {
  return `/tmp/${id}`;
}
