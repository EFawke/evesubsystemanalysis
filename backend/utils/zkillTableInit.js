const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('zkill.db');

const zkillDbInit = () => {
    db.run(`CREATE TABLE IF NOT EXISTS zkill(
    zkill_id PRIMARY KEY NOT NULL,
    hash TEXT NOT NULL
);`, (err) => {
    if(err){
        throw err;
    }
})
}

module.exports = zkillDbInit;