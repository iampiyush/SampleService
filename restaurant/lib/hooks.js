'use strict';

const Config = require('../config');

var uid2 = require('uid2');

var Hooks = {};

/* ---------  Local Helper Methods Starts ---------- */

function _isAllowedHost (host) {
  return Config.CORS_ALLOWED_HOSTS.some(contains);

  function contains (item) {
    return host.indexOf(item) > -1;
  }
}
/* --------- Local Helper Methods Ends --------- */

/*
  Generate A unique request id if not present
*/
Hooks.genRequestId = function genRequestId (req, res, next) {
  req.req_id = req.headers['x-request-id'] || req.headers['x-client-id'] || req.body.client_request_id || uid2(25);
  next();
};

/*
  Allow cross domain access to pre-specified origin domains.
*/
Hooks.CORSHeaders = function CORSHeaders (req, res, next) {
  var origin = req.headers.origin;
  if (origin && _isAllowedHost(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  }
  next();
};

/*
  404 Not Found
*/
Hooks.notFound = function notFound (req, res, next) {
  res.sendStatus(404);
};

module.exports = Hooks;
