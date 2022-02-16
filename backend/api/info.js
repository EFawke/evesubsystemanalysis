// const express = require('express');
// const infoRouter = express.Router();
// const { Client } = require('pg');
// const { Pool } = require('pg')

// infoRouter.get(`/totalDestroyed/:shipName`, (req, response, next) => {
//     const shipName = req.params.shipName;
//     const shipTypeId = shipSelector(shipName);
    // const client = new Client({
    //     connectionString: process.env.DATABASE_URL,
    //     ssl: {
    //         rejectUnauthorized: false
    //     }
    // });
    // client.connect()
    // client.query(`SELECT COUNT(*) FROM esi WHERE ship_type_id = '${shipTypeId}';`, (err, res) => {
    //     if (err) {
    //         client.end()
    //     } else {
    //         client.end()
    //         const data = res.rows;
    //         const floop = {
    //             number: data[0].count,
    //             ship: shipName
    //         }
    //         response.status(200).send(floop)
    //     }
    //     client.end()
    // })
// })

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

module.exports = infoRouter;