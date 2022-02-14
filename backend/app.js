const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { Client } = require('pg');
const app = express();
const errorHandler = require('errorhandler');

console.log('backend is online')

//makes a router for all express api routes.
//UNCOMMENT THIS AFTER TEST
const apiRouter = require('./api/apiRouter')
app.use('/api', apiRouter);

// const port = 5000;

//using dependencies
app.use(morgan('dev'));
app.use(cors());
app.use(errorHandler());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

const path = require('path')

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('../frontend/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'../', 'frontend', 'build', 'index.html'));
  });
}

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname + '/../frontend/src/index.js'))) //changed comma to a + here

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/public/index.html'))

})

app.listen(port, () => console.log(`listening on port ${port}`));