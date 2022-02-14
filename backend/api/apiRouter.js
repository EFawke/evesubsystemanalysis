const express = require('express');
const apiRouter = express.Router();
const zkillRouter = require('./zkill.js');
const infoRouter = require('./info.js');
const shipTypeRouter = require('./shipTypeRouter.js')
// const hoverRouter = require('./hover.js');

apiRouter.use('/ShipType', shipTypeRouter);
apiRouter.use('./zkill.js', zkillRouter);
apiRouter.use('/info', infoRouter);
// apiRouter.use('/hoverRouter', hoverRouter);

module.exports = apiRouter;