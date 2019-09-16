'use strict';

const Config = require('../config');
const Router = require('express').Router();

Router.use(require('./status'));

Router.use('/v1', require('./v1'));

module.exports = Router;
