const express = require('express');
const app = express();

const logger = require('./startup/logging')();
require('./startup/routes')(app, logger);
require('./startup/db')(logger);
require('./startup/config')();



const port = process.env.PORT | 3000;
app.listen(port, () => logger.info(`Listening on port ${port} ..`));
