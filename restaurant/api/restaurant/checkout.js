'use strict';

const Config = require('../../config');
const HOME_DIR = Config.HOME_DIR;
const ERROR_MESSAGES = Config.ERROR_MESSAGES;

const Debug = require('debug')('api:restaurant:checkout');

const Lib = require(HOME_DIR + '/lib');
const APIError = Lib.api_error;
const Request = Lib.request;


module.exports = function checkout (body, opts, cb) {

  opts = opts || {};
  opts.query = opts.query || {};
  opts.headers = opts.headers || {};
};

/* ----------------------- Test Code ---------------------- */

(function () {
  if (require.main === module) {}
})();
