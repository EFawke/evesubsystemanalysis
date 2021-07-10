const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('zkill.db');

const esiDbInit = () => {
    db.run(`CREATE TABLE IF NOT EXISTS esi(
    killmail_id PRIMARY KEY,
    killmail_time TEXT NOT NULL,
    ship_type_id INTEGER NOT NULL,
    weekday TEXT
);`, (err) => {
    if(err){
        throw err;
    }
    })
}

module.exports = esiDbInit;