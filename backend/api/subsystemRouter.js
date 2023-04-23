const express = require('express');
const shipTypeRouter = express.Router();
const { Client } = require('pg');
const { Pool } = require('pg');
const axios = require('axios');

shipTypeRouter.get(`/:subsystemID`, (req, res, next) => {
    const subsystemID = req.params.subsystemID;
    const subsystemName = subsystemSelector(subsystemID);
    let client;

    if (!process.env.DATABASE_URL) {
        client = new Client()
    } else {
        client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            },
            allowExitOnIdle: true
        });
    }
    let heatmap = {
        Monday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Tuesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Wednesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Friday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Saturday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Sunday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    client.connect()
    client.query(`SELECT * FROM subsystems WHERE type_id = '${subsystemID}';`, (err, response) => {
        if (err) {
            client.end()
            res.status(404).send(heatmap);
        } else {
            client.end()
            const data = response.rows
            data.forEach((row) => {
                const killTime = new Date(row.killtime);
                const day = killTime.getDay();
                const hour = killTime.getHours();
                switch (day) {
                    case 0:
                        heatmap.Sunday[hour] += 1;
                        break;
                    case 1:
                        heatmap.Monday[hour] += 1;
                        break;
                    case 2:
                        heatmap.Tuesday[hour] += 1;
                        break;
                    case 3:
                        heatmap.Wednesday[hour] += 1;
                        break;
                    case 4:
                        heatmap.Thursday[hour] += 1;
                        break;
                    case 5:
                        heatmap.Friday[hour] += 1;
                        break;
                    case 6:
                        heatmap.Saturday[hour] += 1;
                        break;
                    default:
                        break;
                }
            })
            res.status(200).send(heatmap);
        }
    })
})

const subsystemSelector = (subsystemID) => {
    axios(`https://esi.evetech.net/latest/universe/types/${subsystemID}/?datasource=tranquility`)
        .then((response) => {
            return response.data.name;
        })
        .catch((error) => {
            console.log(error);
        })
}



module.exports = shipTypeRouter;