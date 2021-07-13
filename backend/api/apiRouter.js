const express = require('express');
const apiRouter = express.Router();
const esiRouter = require('./esi.js');
const zkillRouter = require('./zkill.js');
const infoRouter = require('./info.js');
const c5Router = require('./c5Router.js');
const maraudersRouter = require('./maraudersRouter.js')
const dreadnoughtRouter = require('./dreadnoughtRouter.js')
const shipTypeRouter = require('./shipTypeRouter.js')

apiRouter.use('/ShipType', shipTypeRouter);
apiRouter.use('/Dreadnoughts', dreadnoughtRouter);
apiRouter.use('/Marauders', maraudersRouter);
apiRouter.use('/C5', c5Router);
apiRouter.use('/esi', esiRouter);
apiRouter.use('/zkill', zkillRouter);
apiRouter.use('/info', infoRouter);


module.exports = apiRouter;