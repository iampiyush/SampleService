'use strict';

const Config = require('../../../config');
const HOME_DIR = Config.HOME_DIR;

const _ = require('lodash');
const Lib = require(HOME_DIR + '/lib');
const Utils = Lib.utils;

/* ------------- Local Helper Methods Starts ---------- */


function _getOrderResponse (order, clientRequestId) {
  return {
    order_id: order.id,
    created_at: order.created_at,
  };
}

/* ------------- Local Helper Methods Ends ---------- */

class Normalise {
  static placeorder (body, order, opts) {
    return _getOrderResponse(order, body.client_request_id);
  }

  static statusCheck (order, opts) {
    let response = {
      status: order.status,
    };
    return response;
  }
}

module.exports = Normalise;

/* ----------------------- Test Code ---------------------- */

(function () {
  if (require.main === module) {}
})();
