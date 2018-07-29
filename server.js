'use strict';

const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { logger, logTransports } = require('./lib/logger')();
const expressWinston = require('express-winston');
const os = require('os');

require('dotenv').load({
  path: '.env',
  sample: '.env-sample'
});

const PORT = process.env.PORT;

const hostname = os.hostname();

  const loggerOpts = {
    transports: logTransports,
    meta: true,
    expressFormat: false,
    colorize: false,
    msg: `host = ${hostname} - ip: {{ req.headers['x-forwarded-for'] || req.connection.remoteAddress }}`
  };

// Third party middlewares registration
app.use(bodyParser.json());

app.use(expressWinston.logger(loggerOpts));

// The locals variables response and aux will be used in
// every request, this middleware helps to prepare the object.
app.use((req, res, next) => {
  res.locals.response = [];
  res.locals.aux = {};
  return next();
});

app.get('/', (req, res) => res.send('Hello World!'));

// Start the server
http.createServer(app).listen(process.env.PORT, (err) => {
  if (err) {
    logger.error(`The server is unable to listen on port ${process.env.PORT}`, err);
    return;
  }

  logger.info(`The server started succesfully on port: ${process.env.PORT}`);

});
