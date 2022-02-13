const pg = require('pg')
const pool = new pg.Pool();

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const zkillDbInit = () => {
  client.connect();
  client.query(`CREATE TABLE IF NOT EXISTS zkill(
    zkill_id integer PRIMARY KEY NOT NULL,
    hash TEXT NOT NULL
);`, (err, res) => {
    if (err){
      console.log(err);
    } else {
      console.log('this part fine')
    }
    client.end();
  });
}

module.exports = zkillDbInit;