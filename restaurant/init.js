'use strict';

const Config = require('./config');

const Promise = require('q');

/**
 * initialize variables which are required before application startup
**/
// Return a Promise

module.exports = function initialize () {
  const deferred = Promise.defer();

  deferred.resolve(true);
  return deferred.promise;
};
