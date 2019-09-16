'use strict';

const Config = require('../../../config');
const HOME_DIR = Config.HOME_DIR;
const ERROR_MESSAGES = Config.ERROR_MESSAGES;

const _ = require('lodash');
const Debug = require('debug')('api:restaurant:v1');
const Util = require('util');

const Lib = require(HOME_DIR + '/lib');
const APIError = Lib.api_error;
const Logger = Lib.logger();
const Utils = Lib.utils;

const Model = require(HOME_DIR + '/model');
const RestaurantModel = Model.restaurant;

const orderApi = require(HOME_DIR + '/api/order');

const Validate = require('./validate');
const Normalise = require('./normalise');



class Restaurant {
  static get validate () {
    return Validate;
  }

  static get normalise () {
    return Normalise;
  }

  static fetchOrder (orderId, opts, cb) {
    // If no order id passed return right away
    if (!orderId) {
      return cb();
    }

    let response = {};

      return cb(null, response);
  }

}

module.exports = Restaurant;

/* ----------------------- Test Code ---------------------- */

(function () {
  if (require.main === module) {}
})();
