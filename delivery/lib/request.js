'use strict';

/**
 * request module
 * @module lib/request
 */

const Config = require('../config');
const ERROR_MESSAGES = Config.ERROR_MESSAGES;

const Debug = require('debug')('lib:request');
const Promise = require('q');
const Request = require('request');

const APIError = require('./api_error');

const RETRY_ERR_CODES = ['ETIMEDOUT', 'ESOCKETTIMEDOUT'];
const VALID_CODES = [200];

/* ------------ Local Helper Methods Starts ------------ */

const _request = function _request (reqOptions, maxRetry, opts, cb) {
  reqOptions.qs.retry = isNaN(reqOptions.qs.retry) ? 0 : reqOptions.qs.retry + 1;
  reqOptions.headers['x-retry'] = isNaN(reqOptions.headers['x-retry']) ? 0 : reqOptions.headers['x-retry'] + 1;

  Request(reqOptions, (err, res, body) => {
    if (err) {
      if (maxRetry > 0 && RETRY_ERR_CODES.indexOf(err.code) > -1) {
        return _request(reqOptions, --maxRetry, opts, cb);
      }
      if (RETRY_ERR_CODES.indexOf(err.code) > -1) {
        const errorCode = opts.errorCode || 'TIMEOUT_ERR_CODE';
        const error = ERROR_MESSAGES[errorCode];
        return cb(new APIError(error.status, error.message, errorCode, error.title));
      }
      return cb(err);
    }

    if (!err && (!res || VALID_CODES.indexOf(res.statusCode) === -1)) {
      err = new Error((body && body.error));

      let stack = err.stack;

      if (typeof body === 'object') {
        // Copy all keys of body to err
        Object.assign(err, body);
      }

      err.stack = stack;
      err.status = res && res.statusCode;
      return cb(err);
    }

    return cb(null, body);
  });
};

/* ------------ Local Helper Methods Ends ------------ */

exports.fire = function fire (uri, method, data, headers, opts) {
  const reqOptions = {
    uri: uri,
    method: method,
    qs: opts.qs || {},
    json: data || true,
    headers: Object.assign({}, headers, {'Connection': 'Keep-Alive'}),
    timeout: opts.timeout || 2 * 1000
  };

  Debug(JSON.stringify(reqOptions, null, 2));

  const deferred = Promise.defer();
  const maxRetry = Number(opts.maxRetry);

  _request(reqOptions, maxRetry, { errorCode: opts.errorCode }, (err, res) => {
    if (err) {
      return deferred.reject(err);
    } else {
      return deferred.resolve(res);
    }
  });

  return deferred.promise;
};
