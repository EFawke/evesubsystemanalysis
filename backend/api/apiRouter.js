const express = require('express');
const apiRouter = express.Router();
const subsystemRouter = require('./subsystemRouter.js');
const keyRouter = require('./key.js');
const aboutRouter = require('./about.js')
const cron = require('./grabDataAndInsert.js');
const cron4 = require('./materialGrabber.js');

apiRouter.use('/subsystems', subsystemRouter);
apiRouter.use('/key', keyRouter);
apiRouter.use('/about', aboutRouter);

module.exports = apiRouter;