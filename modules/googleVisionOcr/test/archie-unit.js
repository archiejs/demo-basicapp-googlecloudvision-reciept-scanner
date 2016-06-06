'use strict';

const path = require('path');

// consts

var rootdir = path.resolve("./../../");
var depfile = 'deptree';

// load deps

var deptrees = require(path.join(rootdir, depfile));
var theTestApp = [ deptrees.googleVision ]; // to autogen

// setup archiejs

var Archie = require('archiejs');

var tree = Archie.resolveConfig(theTestApp, rootdir);

module.exports = function(done) {
  Archie.createApp(tree, function(err, archie) {
    done(err, archie);
  });
};
