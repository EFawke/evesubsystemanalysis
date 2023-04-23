const express = require('express');
const apiRouter = express.Router();
const cron = require('./grabDataAndInsert.js');
const subsystemRouter = require('./subsystemRouter.js');
// const gettingData = require('./gettingData.js');
// const tech3CruiserRouter = require('./requestingTech3Cruisers.js');
// const zkillRouter = require('./zkill.js');
// const shipTypeRouter = require('./shipTypeRouter.js')
// const infoRouter = require('./info.js');
// const searchRouter = require('./search.js');

apiRouter.use('/subsystems', subsystemRouter);
// apiRouter.use('./zkill.js', zkillRouter);
// apiRouter.use('/ShipType', shipTypeRouter);
// apiRouter.use('/counter', infoRouter);
// apiRouter.use('/Lookup', searchRouter);

module.exports = apiRouter;