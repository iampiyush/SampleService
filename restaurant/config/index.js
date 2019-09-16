'use strict';

const OS = require('os');
const Debug = require('debug')('Server:Config');
const Path = require('path');

let config = {};

config.HOST = '127.0.0.1';

config.SELF_HOST = 'http://localhost';

config.PORT = Number(process.env.PORT || 9090);

config.NODE_ENV = process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

config.HOME_DIR = process.env.HOME_DIR = Path.join(__dirname, '..');

config.HOME = '/var/www';

config.HTTP_MAX_SOCKETS = 1500;
config.HTTPS_MAX_SOCKETS = 400;

config.HOST_NAME = OS.hostname();

config.PROCESS_ID = process.pid;

config.OrderList = {};
config.deliveryService = {};

config.INTERVALS = {};

config.LOGGER = {
  NAME: 'default',
  LEVEL: process.env.LOG_LEVEL || 0,
  DATE_FORMAT: 'yyyy-mm-dd HH:MM:ss.l'
};

config.ERROR_MESSAGES = {
  TIMEOUT_ERR_CODE: {
    status: 417, message: 'Internal API timed out.', title: 'API error'
  },

  RTL_EC_4000: {
    status: 412, message: 'Oops! No items in cart.', title: 'Empty Cart'
  }
};

var ENVIRONMENT_CONFIGS = {
  development: {
    CORS_ALLOWED_HOSTS: ['localhost'],
  },
};

function loadConfig () {
  let ENVIRONMENT_CONFIG = ENVIRONMENT_CONFIGS[config.NODE_ENV];

  // Overwrite key with environment key
  Object.keys(ENVIRONMENT_CONFIG).forEach(key => {
    config[key] = ENVIRONMENT_CONFIG[key];
  });

  Debug(JSON.stringify(config));
  return config;
}

module.exports = loadConfig();
