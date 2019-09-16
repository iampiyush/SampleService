'use strict';

const Config = require('../config');

const UtilLog = require('log-util');

const loggerCache = {};

module.exports = function Logger (name, opts) {
  name = name || Config.LOGGER.NAME;

  opts = opts || {};

  // if logger is already created return
  if (loggerCache[name]) return loggerCache[name];

  const dateFormat = opts.dateFormat || Config.LOGGER.DATE_FORMAT;
  const level = opts.level || Config.LOGGER.LEVEL;

  let logger = new UtilLog.Log(level, dateFormat);

  loggerCache[name] = logger;

  return logger;
};
