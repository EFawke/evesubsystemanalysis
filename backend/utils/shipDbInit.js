// const path = require('path');
// const query = path.join(__dirname, '../', 'utils', 'shiplist.csv')
// const csv = require('csvtojson') // Make sure you have this line in order to call functions from this modules
// const { Client } = require('pg');


// const shipDbInit = async () => {
//     let client;

//     if (!process.env.DATABASE_URL) {
//       client = new Client()
//     } else {
//       client = new Client({
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//           rejectUnauthorized: false
//         },
//         allowExitOnIdle: true
//       });
//     }
//     client.connect();
//     client.query(`CREATE TABLE IF NOT EXISTS ships(
//       id INTEGER PRIMARY KEY,
//       name TEXT NOT NULL,
//       class TEXT NOT NULL,
//   );`, (err, res) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('ships created')
//       }
//       client.end();
//     });
//     csv()
//         .fromFile(query)
//         .then((jsonObj) => {
//             fillErUp(jsonObj)
//         })
// }

// const fillErUp = async (obj) => {
//     let client;

//     if (!process.env.DATABASE_URL) {
//       client = new Client()
//     } else {
//       client = new Client({
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//           rejectUnauthorized: false
//         },
//         allowExitOnIdle: true
//       });
//     }
//     client.connect();
//     for(let i = 0; i < obj.length; i++){
//       client.query(`INSERT INTO ships (id, name, class) VALUES ('${obj.id}', '${obj.name}', '${obj.class}')`, (err, res) => {
//         client.end()
//         if (err) {
//             client.end()
//             console.log('n-no senpai, not there')
//         } else {
//             client.end()
//             console.log('ship inserted');
//         }
//     })
//     }
// }



// module.exports = shipDbInit;