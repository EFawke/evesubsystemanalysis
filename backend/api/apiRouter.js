const express = require('express');
const apiRouter = express.Router();
const cron = require('./grabDataAndInsert.js');
//const cron2 = require('./evepraisalData.js');
//const cron3 = require('./subsystemManufactureCostData.js');
const cron4 = require('./materialGrabber.js');
const subsystemRouter = require('./subsystemRouter.js');

apiRouter.use('/subsystems', subsystemRouter);

module.exports = apiRouter;