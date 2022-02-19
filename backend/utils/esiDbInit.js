const { Client } = require('pg');

console.log(process.env)

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
    weekday TEXT NOT NULL
);`, (err, res) => {
    if (err){
      console.log(err);
    } else {
      console.log('this part fine')
    }
    client.end();
  });
}

module.exports = esiDbInit;