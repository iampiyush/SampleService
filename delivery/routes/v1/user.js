'use strict';

const Config = require('../../config');
const HOME_DIR = Config.HOME_DIR;

const _ = require('lodash');

const Api = require(HOME_DIR + '/api');
//const UserAPi = Api.user;

class User {
  static details (req, res, next) {
    let token = req.headers.auth_token;
    return next();
    /*UserAPi.fetchByToken(token, {}, (err, user) => {
      req.user = user;

      return next(err);
    });*/
  }
}

module.exports = User;

/* ----------------------- Test Code ---------------------- */

(function () {
  if (require.main === module) {}
})();
