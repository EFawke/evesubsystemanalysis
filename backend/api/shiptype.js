const express = require('express');
const sqlite3 = require('sqlite3');

const shipTypeRouter = express.Router();
const db = new sqlite3.Database('zkill.db');

module.exports = shipTypeRouter;