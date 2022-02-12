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

const zkillDbInit = () => {
    client.connect();
    console.log('database connected')
    client.query(`CREATE TABLE IF NOT EXISTS zkill(
    zkill_id PRIMARY KEY NOT NULL,
    hash TEXT NOT NULL
);`, (err) => {
    if(err){
        throw err;
    }
})
client.end();
}

module.exports = zkillDbInit;