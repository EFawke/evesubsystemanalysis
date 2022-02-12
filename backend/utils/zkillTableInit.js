const express = require('express');
const zkillDbInit = express.Router();

const pg = require('pg')
const pool = new pg.Pool();

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();


const zkillDbInit = () => {
  client.query(`CREATE TABLE IF NOT EXISTS zkill(
    zkill_id PRIMARY KEY NOT NULL,
    hash TEXT NOT NULL
);`, (err, res) => {
    if (err) console.log(err);
    client.end();
  });
}


// const zkillDbInit = () => {
//     pool.connect(function (err, client, done) {
//         if(err){
//             console.log(err)
//         }
//         console.log(client)
//         console.log('database connected')
//         client.query(`CREATE TABLE IF NOT EXISTS zkill(
//             zkill_id PRIMARY KEY NOT NULL,
//             hash TEXT NOT NULL
//         );`, (err) => {
//             if(err){
//                 console.log(err);
//             }
//     })
//     done();
//     })
// }

module.exports = zkillDbInit;



/*  query(`CREATE TABLE IF NOT EXISTS zkill(
    zkill_id PRIMARY KEY NOT NULL,
    hash TEXT NOT NULL
);`, (err) => {
    if(err){
        console.log(err);
    }
*/