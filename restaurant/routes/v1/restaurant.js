'use strict';

const Config = require('../../config');
const HOME_DIR = Config.HOME_DIR;

const _ = require('lodash');
const Api = require(HOME_DIR + '/api');
const RetailerApi = Api.restaurant.v1;
const uid2 = require('uid2');
const Request = require('request');

class Validate {
  static updateDeliveryStatus (req, res, next) {
    let body = req.body;
    return next();
    /*RestaurantApi.validate.updateDeliveryStatus(body, {}, (err) => {
      span.finish();
      next(err);
    });*/
  }

  static placeorder (req, res, next) {
    let body = req.body;
    return next();

    /*RestaurantApi.validate.placeorder(body, {}, (err) => {
      span.finish();
      next(err);
    });*/
  }

  static deliveryPerson(req, res, next) {
    return next();
  } 
 
  static statusCheck (req, res, next) {
    return next();
   /* let query = req.query;

    RestaurantApi.validate.statusCheck(query, {}, (err) => {
      span.finish();
      next(err);
    });*/
  }
}

class Normalise {

  static updateDeliveryStatus (req, res, next) {
      req.response = {
        'orderData': req.orderData
      }
   // req.response = RestaurantApi.normalise.updateDeliveryStatus(body, order, {});

    return next();
  }

  static placeorder (req, res, next) {
    req.response = {
      'orderid': req.oid
    }
    //req.response = RestaurantApi.normalise.placeorder(body, order, {});

    return next();
  }

  static deliveryStatus (req, res, next) {
    let order = req.order;
    return next();
  }

  static fetchDeliveryPerson (req, res, next) {
    req.response = req.orderData
    return next();
  }
    
  static updateDeliveryService (req, res, next) {
    req.response = 'Delivery Service info received'
    return next();
  }
  static statusCheck (req, res, next) {
      req.response = {
        'orderData': req.orderData
      }
 //   req.response = RetailerApi.normalise.statusCheck(order, {});

    return next();
  }
}

class Restaurant {
  static get normalise () {
    return Normalise;
  }

  static get validate () {
    return Validate;
  }

  static fetchOrder (req, res, next) {
    let query = req.query;
    let oid = query.oid
    let orderData =  Config.OrderList[oid]
    req.orderData = orderData
    return next();
  }  

  static fetchDeliveryPerson (req, res, next) {
    let orderList = Config.OrderList
    console.log('orderList == %j', orderList);
      
      req.orderData = orderList 
    return next();
  }

  static placeorder (req, res, next) {
    let body = req.body;
    body.status = '1'
    let oid = uid2(25)
    console.log('oid == %j', oid)
    
    Config.OrderList[oid]= body
    
    console.log('config == %j', Config.OrderList);
    req.oid = oid
    return next();
  }

  static assignOrder (req,res, next) {
    let oid = req.oid
    
    
    let host = Config.deliveryService.host || 'localhost';
    let port = Config.deliveryService.port || 8000;
    let uri = 'http://' + host + ':' + port + '/v1/deliveryPersonList'
    let reqOpts = {
      uri: uri,
      method: 'GET'
    }

    console.log('reqOpts == %j', reqOpts);
    Request(reqOpts, (err, res, body) => {
      if (err) {
        // return err that delivery persons cant be fetched
      }
      else {
        
        body = JSON.parse(body)
        let deliveryPersonFreeList = body["deliveryPersonFreeList"]
        
        if (deliveryPersonFreeList.length == 0) {
         // return err
        }  
        else {
          let deliveryPersonTobeAssigned =  deliveryPersonFreeList[Math.floor(Math.random() * deliveryPersonFreeList.length)];
          let uri = 'http://' + host + ':' + port + '/v1/assignOrder'
          let reqOpts = {
            uri: uri,
            method: 'POST',
            json: {
              "oid": oid,
              "did": deliveryPersonTobeAssigned 
            },
          }
          Request(reqOpts, (err, res, body) => {
             if (err) {
                // return err that delivery persons cant be assigned
             }
             else {
               console.log('body == %j', body);
              }
          });
        }
      }
    });
    return next();
  }

  static updateDeliveryStatus (req, res, next) {
    let body = req.body;
    let oid = body.oid;
    let status = body.status;
    let order = Config.OrderList[oid]
    order.status = status
    req.orderData = order
    if (status == '10') {
        let host = Config.deliveryService.host || 'localhost';
            let port = Config.deliveryService.port || 8000;
        // mark delivery person as free.
        let uri = 'http://' + host + ':' + port + '/v1/removeOrder'
        let reqOpts = {
        uri: uri,
        method: 'POST',
        json: {
          oid: oid
        }}
        console.log('reqOpts == %j', reqOpts);
        Request(reqOpts, (err, res, body) => {
          if (err) {

          }
          else {

          }
        });
    }

    return next();
  }

  static updateDeliveryService(req, res, next) {
    let query = req.query
    let host = query.host
    let port = query.port
    Config.deliveryService.host = host
    Config.deliveryService.port = port
    console.log('Config.deliveryService == %j', Config.deliveryService);
    
    return next()
  }
  
  
  static respond (req, res, next) {
    res.json(req.response);
  }
}

module.exports = Restaurant;

/* ----------------------- Test Code ---------------------- */

(function () {
  if (require.main === module) {}
})();
