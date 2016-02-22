/*
 * These modules are commonly loaded by
 * all microservers.
 *
 * Ex: db module, analytics module are contendors.
 */

var config = require('./../env');

module.exports = [{
    packagePath: 'models',
    packageWrapper: 'mongodb',
    mongoose: require('mongoose'),
    server: config.db
}];
