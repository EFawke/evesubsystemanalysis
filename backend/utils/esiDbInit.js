// const sqlite3 = require('sqlite3');

// const db = new sqlite3.Database('zkill.db');
const { Client } = require('pg');


const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


// client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//         console.log(JSON.stringify(row));
//     }
//     client.end();
// });


const esiDbInit = () => {
    client.connect();
    client.query(`CREATE TABLE IF NOT EXISTS esi(
    killmail_id PRIMARY KEY,
    killmail_time TEXT NOT NULL,
    ship_type_id INTEGER NOT NULL,
    weekday TEXT
);`, (err) => {
    if(err){
        throw err;
    }
    })
    client.end()
}

module.exports = esiDbInit;