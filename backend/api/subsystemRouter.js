const express = require('express');
const shipTypeRouter = express.Router();
const { Client } = require('pg');
const { Pool } = require('pg');
const axios = require('axios');

const subsystemIDArr = ["all", "45622", "45623", "45624", "45625", "45626", "45627", "45628", "45629", "45630", "45631", "45632", "45633", "45586", "45587", "45588", "45589", "45590", "45591", "45592", "45593", "45594", "45595", "45596", "45597", "45610", "45611", "45612", "45613", "45614", "45615", "45616", "45617", "45618", "45619", "45620", "45621", "45598", "45599", "45600", "45601", "45602", "45603", "45604", "45605", "45606", "45607", "45608", "45609"]
let output = {};
shipTypeRouter.get(`/:subsystemID`, (req, res, next) => {
    if (!req.params.subsystemID || !subsystemIDArr.includes(req.params.subsystemID)) {
        res.status(400).send("Invalid subsystem ID");
        return;
    } else {
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
        let today = new Date();
        let lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 6);
        today = today.toISOString();
        lastWeek = lastWeek.toISOString();
        lastWeek = lastWeek.slice(0, -14) + "T00:00:00.000Z";
        // let output = {
        //     name: null,
        //     id: req.params.subsystemID,
        //     graphData: null,
        //     heatmap: null,
        //     pieChart: null,
        //     today: today,
        //     lastWeek: lastWeek
        // };
        output.id = req.params.subsystemID;
        output.name = null;
        output.graphData = null;
        output.heatmap = null;
        output.pieChart = null;
        output.today = today;
        output.lastWeek = lastWeek;

        let graphData = [

        ];
        for (let i = 0; i < 7; i++) {
            let date = new Date();
            date.setDate(date.getDate() - i);
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
        let counter = 0;
        let pieChartData = {};
        client.connect()
        const sql = `SELECT * FROM subsystems WHERE killtime BETWEEN '${lastWeek}' AND '${today}';`;
        client.query(sql, (err, response) => {
            client.end();
            if (err) {
                res.status(404).send(output);
                return;
            }
            const data = removeEntryIfTooOld(response.rows, today, lastWeek);
            data.forEach((row) => {
                if (pieChartData[row.type_name]) {
                    pieChartData[row.type_name].count += 1;
                } else {
                    pieChartData[row.type_name] = {};
                    pieChartData[row.type_name].id = row.type_id;
                    pieChartData[row.type_name].count = 1;
                }
                if (row.type_id !== req.params.subsystemID) {
                    return;
                }
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
                graphData.forEach((day) => {
                    if (day.date === killTime.toISOString().slice(0, 10)) {
                        day.count += 1;
                    }
                })
                counter++;
                if (counter === 1) {
                    output.id = row.type_id;
                    output.name = row.type_name;
                }
            })

            output.heatmap = heatmap;
            output.graphData = graphData;
            output.pieChart = pieChartData;
            // res.status(200).send(output);
            next();
        })
        //uncomment when ready to move on...
    }
})

shipTypeRouter.get(`/:subsystemID`, (req, res) => {
    if (!req.params.subsystemID || !subsystemIDArr.includes(req.params.subsystemID)) {
        res.status(400).send("Invalid subsystem ID");
        return;
    } else {
        const id = req.params.subsystemID;
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
        client.connect()
        const sql = `SELECT * FROM evepraisal_prices WHERE itemID = ${id}`;

        client.query(sql, (err, response) => {
            if(err){
                client.end();
                console.log(err);
            }
            client.end();
            output.evepraisal = response.rows[0];
            // console.log(output);
            res.status(200).send(output);
        })
    }
})

const removeEntryIfTooOld = (arrayOfResponses, today, lastWeek) => {
    const output = [];
    arrayOfResponses.forEach((response) => {
        const killTime = new Date(response.killtime);
        if (killTime > new Date(lastWeek) && killTime < new Date(today)) {
            output.push(response);
        }
    })
    return output;
}

module.exports = shipTypeRouter;