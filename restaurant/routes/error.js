#!/usr/bin/env node
'use strict';

const Config = require('../config');
const HOME_DIR = Config.HOME_DIR;

const Util = require('util');

const Lib = require(HOME_DIR + '/lib');
const Logger = Lib.logger();

module.exports = function error (err, req, res, next) {
  let code = err.status || 500;
  var title = err.title || err.error_title || 'Error';

  let response = {
    error: err.message,
    error_title: title,
    status: {
      result: 'failure',
      message: {
        title: title,
        message: err.message
      }
    },
    additional_info: err.additional_info,
    code: code,
    errorCode: err.errorCode || ''
  };

  if (Config.NODE_ENV === 'development' || code >= 500) {
    // we have stack trace lets print it!
    if (err.stack) {
      response.stack = err.stack.split('\n');
      Logger.error(Util.inspect(response.stack));
    }

    if (Config.NODE_ENV === 'production') {
      if (!err.errorCode) {
        response.error = response.status.message.message = 'An unexpected error has occured';
      }
      delete response.stack;
    }
  }

  Logger.error(`${req.originalUrl} ${response.error} ${response.code} ${response.errorCode}`);

  res.setHeader('app-err-code', response.errorCode);

  res.status(code).json(response);
};
