'use strict';

// Global Configs
const Config = require('./config');
const HOME_DIR = Config.HOME_DIR;

const Lib = require(HOME_DIR + '/lib');
const Logger = Lib.logger();

// Core NPM modules
const BodyParser = require('body-parser');
const Express = require('express');
const ErrorHandler = require('errorhandler');
const Http = require('http');
const Https = require('https');
const Morgan = require('morgan');
const Path = require('path');
const Request = require('request');

Http.globalAgent.maxSockets = Config.HTTP_MAX_SOCKETS;
Https.globalAgent.maxSockets = Config.HTTPS_MAX_SOCKETS;

const App = Express();

App.set('port', Config.PORT);

App.use(BodyParser.json());

App.use(BodyParser.urlencoded({ extended: false }));

App.enable('trust proxy');

App.use(Lib.hooks.CORSHeaders);
App.use(Lib.hooks.genRequestId);


const Routes = require(HOME_DIR + '/routes');

App.use('/', Routes);

App.use(Lib.hooks.notFound);

require('./init')()
  .then(() => {
  // Start the Server
    let Server = Http.createServer(App);

    Server
      .on('error', (error) => {
        Logger.error(error);
        process.exit(1);
      })
      .listen(Config.PORT, Config.HOST, () => {
        const Request = require('request');
        let reqOpts = {
          qs : {
            host: 'localhost',
            port: Config.PORT
          },
          uri: 'http://localhost:9090/v1/deliveryService',
          method: 'POST'
        }
        Request(reqOpts, (err, res, body) => {
        
        });
        
        Logger.info(`Delivery Server Running On Port: ${Config.PORT} in ${Config.NODE_ENV}`);
      });
  })
  .catch((err) => {
    Logger.error(err);
    process.exit();
  });
