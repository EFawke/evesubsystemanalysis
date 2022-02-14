const { Client } = require('pg');

const esiDbInit = () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query(`CREATE TABLE IF NOT EXISTS esi(
    killmail_id integer PRIMARY KEY,
    killmail_time TEXT NOT NULL,
    ship_type_id INTEGER NOT NULL,
    weekday TEXT NOT NULL
);`, (err) => {
    if(err){
        console.log(err)
    } else {
        console.log('esi initiated')
    }
    })
    client.end()
}

module.exports = esiDbInit;