'use strict';

const path = require('path');

// spaceship path correction

const rootDir = path.join(__dirname, '..', '..', '..');
const depsFile = path.join(rootDir, 'deptree');
const depTrees = require(depsFile);

// setup archiejs

var Archie = require('archiejs');

const theTestApp = [ depTrees.googleDocs, depTrees.googleAuth ]; // to autogen
const tree = Archie.resolveConfig(theTestApp, rootDir);

module.exports = function(done) {
  Archie.createApp(tree, function(err, archie) {
    done(err, archie);
  });
};
