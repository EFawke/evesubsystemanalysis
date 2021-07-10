const express = require('express');
const apiRouter = express.Router();
const esiRouter = require('./esi.js');
const zkillRouter = require('./zkill.js');
const shipTypeRouter = require('./shiptype');

apiRouter.use('/shiptype/', shipTypeRouter);
apiRouter.use('/esi/', esiRouter);
apiRouter.use('/zkill/', zkillRouter);

module.exports = apiRouter;