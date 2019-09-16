'use strict';

const Config = require('../../config');
const HOME_DIR = Config.HOME_DIR;

const Router = require('express').Router();

const ErrorHandler = require(HOME_DIR + '/routes/error');
const Restaurant = require('./restaurant');
const User = require('./user');


Router.post('/restaurant/placeorder', Restaurant.validate.placeorder, User.details,
  Restaurant.placeorder, Restaurant.assignOrder, Restaurant.normalise.placeorder,
  Restaurant.respond, ErrorHandler);

Router.post('/delivery/status', Restaurant.validate.updateDeliveryStatus, User.details,
  Restaurant.updateDeliveryStatus, Restaurant.normalise.updateDeliveryStatus, 
  Restaurant.respond, ErrorHandler);

Router.get('/restaurant/statuscheck', Restaurant.validate.statusCheck, User.details,
    Restaurant.fetchOrder, Restaurant.normalise.statusCheck, Restaurant.respond, ErrorHandler);

Router.get('/deliveryPerson/', Restaurant.validate.deliveryPerson, User.details,
    Restaurant.fetchDeliveryPerson, Restaurant.normalise.fetchDeliveryPerson, Restaurant.respond, ErrorHandler);

Router.post('/deliveryService/', Restaurant.updateDeliveryService, Restaurant.normalise.updateDeliveryService, Restaurant.respond, ErrorHandler)

module.exports = Router;
