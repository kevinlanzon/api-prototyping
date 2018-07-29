const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { logger, logTransports } = require('./lib/logger')();
const expressWinston = require('express-winston');
const os = require('os');

const PORT = process.env.PORT || 3000;

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

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => logger.info(`Example app listening on port ${PORT}!`));