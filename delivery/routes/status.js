'use strict';

const Router = require('express').Router();

Router.get('/_status', (req, res, next) => {
  res.sendStatus(200);
});

module.exports = Router;
