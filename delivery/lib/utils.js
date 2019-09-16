'use strict';

const _ = require('lodash');
const crypto = require('crypto');

var utils = {

  // A do nothing function
  noop: function noop () {

  },

  // Return a closure function to sort a array
  sortBy: function sortBy (key) {
    return function sortFunc (a, b) {
      return _.get(a, key, 0) - _.get(b, key, 0);
    };
  },

  toArray: function toArray (input) {
    return input ? (Array.isArray(input) ? input : [input]) : [];
  },

  toMap: function toMap (input, key) {
    var map = {};
    input.forEach(item => {
      map[_.get(item, key)] = item;
    });

    return map;
  },

  roundTo2Decimals: function (input) {
    return Number(input.toFixed(2));
  },

  arrayIterator: function arrayIterator (input) {
    let i = -1;
    let len = input.length;
    return function next () {
      return ++i < len ? input[i] : null;
    };
  },

  parseJson: function parseJson (data, fallback) {
    fallback = fallback || {};

    if (data) {
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (Ex) {
          data = fallback;
        }
      }
    }

    return data || fallback;
  },

  calculateHmac: function calculateHmac (message, secret) {
    return crypto.createHmac('sha1', secret).update(message).digest('base64');
  },

  JoiStringConvertible: function JoiStringConvertible (Joi) {
    return {
      base: Joi.string(),
      name: 'stringConvertible',
      coerce (value, state, options) {
        function isNumeric (n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        if (isNumeric(value)) { return value.toString(); }
        return value;
      }
    };
  }
};

module.exports = utils;
