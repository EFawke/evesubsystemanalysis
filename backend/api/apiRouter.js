const express = require('express');
const apiRouter = express.Router();
const zkillRouter = require('./zkill.js');
const shipTypeRouter = require('./shipTypeRouter.js')
const infoRouter = require('./info.js');
const searchRouter = require('./search.js');

apiRouter.use('./zkill.js', zkillRouter);
apiRouter.use('/ShipType', shipTypeRouter);
apiRouter.use('/counter', infoRouter);
apiRouter.use('/Lookup', searchRouter);

module.exports = apiRouter;