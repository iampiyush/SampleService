'use strict';

const Config = require('../../../config');
const HOME_DIR = Config.HOME_DIR;
const ERROR_MESSAGES = Config.ERROR_MESSAGES;

const Lib = require(HOME_DIR + '/lib');
const APIError = Lib.api_error;
const Utils = Lib.utils;

class Validate {
  static placeorder (input, opts, cb) {
  }

  static statusCheck (input, opts, cb) {
  }
}

module.exports = Validate;

/* ----------------------- Test Code ---------------------- */

(function () {
  if (require.main === module) {}
})();
