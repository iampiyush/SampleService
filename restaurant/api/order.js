'use strict';

if (!module.parent) require('module-alias/register');
const Config = require('../config');
const HOME_DIR = Config.HOME_DIR;

const Util = require('util');
const Model = require(HOME_DIR + '/model');
const OrderModel = Model.Order;

class OrderService {

  static fetchById (id, opts, cb) {
    OrderModel.fetchById(id, opts, (err, result) => {
      if (err) return cb(err);
      return cb(null, result);
    });
  };

  static createOrder (data, opts, cb) {
    OrderModel.create(data, opts, (err, id) => {
      if (err) return cb(err);
      return cb(null, err);
    });
  }

}


/* ----------------- Test Code ------------------ */

(function () {
  if (require.main === module) {
  }
})();
