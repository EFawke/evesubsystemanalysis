// const { Client } = require('pg');
// let client;
// if (!process.env.DATABASE_URL) {
//     client = new Client()
// } else {
//     client = new Client({
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//             rejectUnauthorized: false
//         },
//         allowExitOnIdle: true
//     });
// }
// client.connect()
//     .catch(err => {
//         console.log("client is down");
//         console.log(err);
//     })
//     .then((res) => {
//         //console.log("client is connected");
//     })

// const cleanUpOld = () => {
//     //remove all entries older than 10 days
//     client.query('DELETE FROM subsystems WHERE killTime < NOW() - INTERVAL \'10 days\'')
//         .catch(err => {
//             console.log(err);
//         }
//         )
//         .then((res) => {
//             console.log("cleaned up old entries");
//             //close the connection

//         }
//         )
//     //remove all entries older than 10 days from marketdata
//     client.query('DELETE FROM market_data WHERE date < NOW() - INTERVAL \'10 days\'')
//         .catch(err => {
//             console.log(err);
//         })
//         .then((res) => {
//             console.log("cleaned up old entries");
//         })
// }

// cleanUpOld();

// const oneDay = 86400000;
// setInterval(cleanUpOld, oneDay);