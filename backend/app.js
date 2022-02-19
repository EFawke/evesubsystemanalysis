const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const errorHandler = require('errorhandler');
const apiRouter = require('./api/apiRouter')
app.use('/api', apiRouter);
app.use(morgan('dev'));
app.use(cors());
app.use(errorHandler());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

const path = require('path')

console.log(process.env)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'../', 'frontend', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`listening on port ${port}`));