'use strict';

const winston = require('winston');

function logger() {

  let logTransports = [];

  let consoleTransport = new(winston.transports.Console)({
    level: process.env.LOG_LEVEL || 'verbose',
    timestamp: true,
    json: (process.env.JSON_LOGS === 'true') || false,
    prettyPrint: true,
    colorize: true
  });

  logTransports.push(consoleTransport);

  let logger = new(winston.Logger)({
    transports: logTransports
  });

  return {
    logger,
    logTransports
  };

}

module.exports = logger;