'use strict';

const Config = require('../../config');
const HOME_DIR = Config.HOME_DIR;

const Router = require('express').Router();

const ErrorHandler = require(HOME_DIR + '/routes/error');
const Restaurant = require('./restaurant');
const User = require('./user');


Router.post('/assignOrder/', Restaurant.validate.placeorder,
  Restaurant.assignOrder, Restaurant.normalise.assignOrder, Restaurant.respond, ErrorHandler);

Router.post('/removeOrder/',  Restaurant.removeOrder, Restaurant.normalise.removeOrder, Restaurant.respond, ErrorHandler);

Router.get('/deliveryPersonStatus/', Restaurant.validate.deliveryPerson,
    Restaurant.fetchDeliveryPerson,  Restaurant.fetchOrder, Restaurant.normalise.fetchDeliveryPerson, Restaurant.respond, ErrorHandler);

Router.get('/deliveryPersonList/', Restaurant.validate.deliveryPerson,
    Restaurant.fetchDeliveryPersonList, Restaurant.normalise.fetchDeliveryPersonList, Restaurant.respond, ErrorHandler);


module.exports = Router;
