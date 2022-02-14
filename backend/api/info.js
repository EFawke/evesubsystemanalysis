const express = require('express');
const infoRouter = express.Router();
// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database('zkill.db');
const { Client } = require('pg');

infoRouter.get(`/totalDestroyed/:shipName`, (req, response, next) => {
    const shipName = req.params.shipName;
    const shipTypeId = shipSelector(shipName);
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect()
    client.query(`SELECT COUNT(*) FROM esi WHERE ship_type_id = '${shipTypeId}';`, (err, res) => {
        if (err) {
            console.log(err + 'poop')
        } else {
            // var d = new Date();
            // d.setMonth(d.getMonth() - 3);
            // let data = 0;
            // let rows = res.rows
            // for(let i = 0; i < rows.length; i ++){
            //     const killmailDate = new Date(rows[i].killmail_time);
            //     if(killmailDate > d){
            //         data +=1;
            //     }
            // }
            // const totalDestroyed = JSON.parse(data);
            // response.send({ totalDestroyed })
            const data = res.rows;
            console.log(data + 'is data in info.js')
            // const totalClassDestroyed = JSON.parse(data);
            const floop = data[0].count
            response.status(200).send(floop)
            client.end()
        }
    })
    // next()
})

const shipSelector = (shipType) => {
    let shipTypeId = ''
    if (shipType === 'Golem') {
        return shipTypeId = 28710;
    }
    if (shipType === 'Paladin') {
        return shipTypeId = 28659
    }
    if (shipType === 'Vargur') {
        return shipTypeId = 28665
    }
    if (shipType === 'Kronos') {
        return shipTypeId = 28661
    }
    if (shipType === 'Revelation') {
        return shipTypeId = 19720
    }
    if (shipType === 'Phoenix') {
        return shipTypeId = 19726
    }
    if (shipType === 'Moros') {
        return shipTypeId = 19724
    }
    if (shipType === 'Naglfar') {
        return shipTypeId = 19722
    }
    if (shipType === 'Gila') {
        return shipTypeId = 17715
    }
    if (shipType === 'Praxis') {
        return shipTypeId = 47466
    }
    if (shipType === 'Nestor') {
        return shipTypeId = 33472
    }
    if (shipType === 'Leshak') {
        return shipTypeId = 47271
    }
    if (shipType === 'Rattlesnake') {
        return shipTypeId = 17918
    }
    if (shipType === 'Heron') {
        return shipTypeId = 605
    }
    return shipTypeId;
}



// infoRouter.get(`/totalClassDestroyed/:class`, (req, response, next) => {
//     const client = new Client({
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//             rejectUnauthorized: false
//         }
//     });
//     let query;
//     if (req.params.class === 'Marauders') {
//         query = "('28661', '28665', '28659', '28710');"
//     }
//     if (req.params.class === 'Dreadnoughts') {
//         query = "('19720', '19726', '19724', '19722');"
//     }
//     if (req.params.class === 'AllC5RattingShips') {
//         query = "('33472', '47271', '19720', '19726', '19724', '19722', '28661', '28665', '28659', '28710');"
//     }
//     client.connect()
//     client.query(`SELECT * FROM esi WHERE weekday IS NOT NULL AND ship_type_id IN ${query}`, (err, res) => {
//         if (err) {
//             console.log(err)
//         } else {
//             const data = res.rows.length;
//             const totalClassDestroyed = JSON.parse(data);
//             response.send({ totalClassDestroyed })
//         }
//     })
//     client.end();
// })

module.exports = infoRouter;