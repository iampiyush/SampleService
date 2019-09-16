'use strict';

const Config = require('../../config');
const HOME_DIR = Config.HOME_DIR;

const _ = require('lodash');
const Api = require(HOME_DIR + '/api');
const RetailerApi = Api.restaurant.v1;
const uid2 = require('uid2');

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

  static assignOrder (req, res, next) {
    req.response = 'delivery person assigned'
    
    return next();
  }

  static removeOrder (req, res, next) {
    req.response = 'delivery person free'
    
    return next();
  }

  static fetchDeliveryPerson (req, res, next) {
    console.log('orderData == %j', req.orderData);
    /*req.response = {
    oid :  req.deliveryData,
    orderData: req.orderData 
   } */
   return next();
  }

  
  static fetchDeliveryPersonList (req, res, next) {
    req.response = {
      deliveryPersonFreeList: req.deliveryPersonFree
    }
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
    /*if (req.deliveryData == -1) {
    // no order assigned
      return next();
    }
    let oid = req.deliveryData
    const Request = require('request');
        let reqOpts = {
          qs : {
            oid: oid,
          },
          uri: 'http://localhost:9090/v1/restaurant/statuscheck',
          method: 'GET'
        }
        Request(reqOpts, (err, res, body) => {
            console.log('err == %j body == %j', err, body);
          if (err) {
            // err fetching order status
           }
           else {
             let bodyData = JSON.parse(body);
            console.log('body == %j', bodyData.orderData);
             req.orderData = bodyData.orderData
            }
        }); 
      
  */    
    return next();
  }  

  static fetchDeliveryPerson (req, res, next) {
    let deliveryPerson = Number(req.query.dpId)
    let deliveryList = Config.DeliveryList
    console.log('deliveryList== %j deliveryPerson == %j Config.DeliveryPersons == %j', deliveryList, deliveryPerson, Config.DeliveryPersons);
    if (Config.DeliveryPersons.indexOf(deliveryPerson) > 0) {
       if (deliveryList[deliveryPerson]) {
         req.deliveryData = deliveryList[deliveryPerson]
       }  
       else {
         req.deliveryData = -1
       }
    }
    else {
     // return error
    
    }

   

if (req.deliveryData == -1) {
    // no order assigned
      return next();
    }
    let oid = req.deliveryData
    const Request = require('request');
        let reqOpts = {
          qs : {
            oid: oid,
          },
          uri: 'http://localhost:9090/v1/restaurant/statuscheck',
          method: 'GET'
        }
        Request(reqOpts, (err, res, body) => {
          if (err) {
            // err fetching order status
           }
           else {
             let bodyData = JSON.parse(body);
             req.orderData = bodyData.orderData
   req.response = {
    oid :  req.deliveryData,
    orderData: req.orderData
   } 

   return next();
            }
        });



  }

  static fetchDeliveryPersonList (req, res, next) {

    let deliveryPersonFree = []
    let deliveryList = Config.DeliveryList
    let deliveryPersonList = Config.DeliveryPersons
    for (var i = 0; i < deliveryPersonList.length; i++) {
      let deliveryPerson = deliveryPersonList[i]
      if (!deliveryList[deliveryPerson]) {
        deliveryPersonFree.push(deliveryPerson);
      }
    }
    req.deliveryPersonFree = deliveryPersonFree

    return next();
  }

  static placeorder (req, res, next) {
    let body = req.body;
    body.status = '1'
    let oid = uid2(25)
    
    Config.OrderList[oid]= body
    
    console.log('config == %j', Config.OrderList);
    req.oid = oid
    return next();
  }

  static updateDeliveryStatus (req, res, next) {
    let body = req.body;
    let oid = body.oid;
    let status = body.status;
    let order = Config.OrderList[oid]
    order.status = status
    req.orderData = order
  //  req.response = RestaurantApi.normalise.updateDeliveryStatus(body, order, {});

    return next();
  }

  
  static assignOrder (req, res, next) {
    let body = req.body;
    let oid = body.oid;
    let did = body.did
    Config.DeliveryList[did] = oid
      
      //  req.response = RestaurantApi.normalise.updateDeliveryStatus(body, order, {});

    return next();
  }


  static removeOrder (req, res, next) {
    let body = req.body;
    let oid = body.oid;
    //delete Config.DeliveryList[did]
    let deliveryList = Config.DeliveryList
     

    console.log('deliveryList == %j', deliveryList);
    for (let key in deliveryList) {
      if (deliveryList.hasOwnProperty(key)) {
        let val = deliveryList[key];
        if (val == oid) {
          delete deliveryList[key]
        }
      }
    }
    
    return next();
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
