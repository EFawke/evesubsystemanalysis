const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const errorHandler = require('errorhandler');

//makes a router for all express api routes.
const apiRouter = require('./api/apiRouter')
app.use('/api', apiRouter);

const port = 5000;

//using dependencies
app.use(morgan('dev'));
app.use(cors());
app.use(errorHandler());

app.listen(port, () => console.log(`listening on port ${port}`));
