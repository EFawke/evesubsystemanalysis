const { Client } = require('pg');


const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const esiDbInit = () => {
    client.connect();
    client.query(`CREATE TABLE IF NOT EXISTS esi(
    killmail_id integer PRIMARY KEY,
    killmail_time TEXT NOT NULL,
    ship_type_id INTEGER NOT NULL,
    weekday text
);`, (err) => {
    if(err){
        console.log(err)
    }
    })
    client.end()
}

module.exports = esiDbInit;