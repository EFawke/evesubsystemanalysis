const express = require('express');
const apiRouter = express.Router();
const zkillRouter = require('./zkill.js');
const shipTypeRouter = require('./shipTypeRouter.js')
const infoRouter = require('./info.js');
// const hoverRouter = require('./hover.js');

apiRouter.use('/ShipType', shipTypeRouter);
apiRouter.use('./zkill.js', zkillRouter);
apiRouter.use('/counter', infoRouter);
// apiRouter.use('/hoverRouter', hoverRouter);

module.exports = apiRouter;