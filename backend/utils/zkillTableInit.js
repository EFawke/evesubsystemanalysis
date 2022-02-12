// const sqlite3 = require('sqlite3');

// const db = new sqlite3.Database('zkill.db');
const pg = require('pg')
const pool = new pg.Pool();

const zkillDbInit = () => {
    pool.connect(function (err, client, done) {
        if(err){
            console.log(err)
        }
        console.log(client)
        console.log('database connected')
        client.query(`CREATE TABLE IF NOT EXISTS zkill(
        zkill_id PRIMARY KEY NOT NULL,
        hash TEXT NOT NULL
    );`, (err) => {
        if(err){
            console.log(err);
        }
    })
    done();
    })
}

module.exports = zkillDbInit;