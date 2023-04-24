const express = require('express');
const shipTypeRouter = express.Router();
const { Client } = require('pg');
const { Pool } = require('pg');

let today = new Date();
let lastWeek = new Date();
lastWeek.setDate(today.getDate() - 7);

today = today.toISOString().slice(0, 10);
today += "T23:59:59.999Z";
lastWeek = lastWeek.toISOString().slice(0, 10);
lastWeek += "T00:00:00.000Z";

shipTypeRouter.get(`/:subsystemID`, (req, res, next) => {
    const subsystemID = req.params.subsystemID;
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

    let output = {
        name: null,
        graphData: null,
        heatmap: null,
        today: today,
        lastWeek: lastWeek
    };

    //graphData should be an array of objects.
    let graphData = [

    ];

    //loop through the last 7 days and add an object with a key of null for each day to graphData.
    for (let i = 0; i < 7; i++) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        // date should be the first 10 characters of the date string.
        day = date.getDay();
        date = date.toISOString().slice(0, 10);
        graphData.push({
            day: day,
            date: date,
            count: 0
        });
    }

    let heatmap = {
        Monday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Tuesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Wednesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Friday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Saturday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Sunday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    client.connect()
    client.query(`SELECT * FROM subsystems WHERE type_id = '${subsystemID}' AND killtime BETWEEN '${lastWeek}' AND '${today}';`, (err, response) => {
        console.log(response.rows);
        if (err) {
            client.end()
            res.status(404).send(output);
        } else {
            output.name = response.rows[0].type_name;
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

                //loop through graphData and increment the count for the day that the kill happened.
                graphData.forEach((day) => {
                    if (day.date === killTime.toISOString().slice(0, 10)) {
                        day.count += 1;
                    }
                })

                output.heatmap = heatmap;
                output.graphData = graphData;
            })
            console.log(output)
            res.status(200).send(output);
        }
    })
})

shipTypeRouter.get(`/:subsystemID`, (req, res, next) => {
    const subsystemID = req.params.subsystemID;
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

    let pieChartOutput = {
        pieChart: null,

    }

    let pieChartDate = [];

    const date = new Date();

    client.connect()
    client.query(`COUNT DISTINCT type_name FROM subsystems WHERE killtime BETWEEN '${lastWeek}' AND '${today}';`, (err, res) => {
        if (err) {
            client.end()
            res.status(404).send(pieChartOutput);
        } else {
            client.end()
            res.status(200).send(pieChartOutput);
        }
    })
})

module.exports = shipTypeRouter;