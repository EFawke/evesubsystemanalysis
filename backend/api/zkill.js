const express = require('express');
const zkillRouter = express.Router();
const axios = require('axios');
const zkillDbInit = require('../utils/zkillTableInit');
const esiDbInit = require('../utils/esiDbInit');
var format = require('pg-format');
const { Client } = require('pg');
const { query, response } = require('express');

esiDbInit();
zkillDbInit();


const { Pool } = require('pg')

const pool = new Pool()

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err) // your callback here
    process.exit(-1)
})

const dateToDay = (date) => {
    const killDate = new Date(date);
    const dayIndex = killDate.getDay();
    switch (dayIndex) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
    }
    return day;
}

const axiosZkillData = async (page) => {
    let pageNumber = page;
    if (pageNumber > 20) {
        return;
    }
    let query;
    if (page == null) {
        query = 'https://zkillboard.com/api/kills/w-space/'
    } else {
        query = `https://zkillboard.com/api/kills/w-space/page/${pageNumber}/`
    }
    const response = await axios.get(query,
        {
            headers: {
                'accept-encoding': 'gzip',
                'user-agent': 'Johnson Kanjus - rage-roll.com - teduardof@gmail.com',
                'connection': 'close'
            }
        }).catch(err => {
            if (err) {
                return;
            }
        })
    if (response === undefined) {
        return
    } else {
        return response.data;
    }
}

const lookUpEsi = async (num) => {
    let pageNum = num
    let killmails = [];
    class Killmail {
        constructor(id, date, ship, day) {
            this.id = id;
            this.date = date;
            this.ship = ship;
            this.day = day;
        }
    }
    const wormholeData = await axiosZkillData(pageNum);
    for (let i = 0; i < Object.keys(wormholeData).length; i++) {
        const currentZKillId = Object.keys(wormholeData)[i]
        const currentHash = Object.values(wormholeData)[i]
        await axios.get(`https://esi.evetech.net/latest/killmails/${currentZKillId}/${currentHash}/?datasource=tranquility`)
            .catch(err => {
                if (err) {
                    return;
                }
            })
            .then((response) => {
                if (response) {
                    killmails[i] = new Killmail(response.data.killmail_id, response.data.killmail_time, response.data.victim.ship_type_id, dateToDay(response.data.killmail_time))
                }
            })
    }
    return killmails;
}

const insertIntoZkill = async (num) => {
    pageNum = num
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    await axiosZkillData(pageNum)
        .catch((err) => {
            console.log(err);
            return;
        })
        .then((wormholeData) => {
            if (wormholeData) {
                for (let i = 0; i < Object.keys(wormholeData).length; i++) {
                    const currentZKillId = Object.keys(wormholeData)[i]
                    const currentHash = Object.values(wormholeData)[i]
                    const zkill_id = currentZKillId
                    const hash = currentHash
                    client.query(`INSERT INTO zkill (zkill_id, hash) VALUES ('${zkill_id}', '${hash}')`, (err, res) => {
                        if (err) {
                            console.log(err)
                            client.end()
                            return
                        }
                    })
                }
            }
        })
        .then(() => {
            client.end()
        })
}

const insertIntoEsi = (counter, res) => {
    var values = []
    for(let i = 0; i < res.length; i++){
        values[i] = [res[i].id, res[i].date, res[i].ship, res[i].day]
    }
    pool.connect()
    .then(client => {
        var sql = `INSERT INTO esi (killmail_id, killmail_time, ship_type_id, weekday) VALUES ?`;
        return client.query(`INSERT INTO esi (killmail_id, killmail_time, ship_type_id, weekday) VALUES ?`, [values], (err, result) => {
            if(err){
                console.log("floop" + err)
                client.end()
            }
        })
        .catch((err) => {
            client.end()
        })
        .then((result) => {
            client.end()
            console.log(result)
        })
    })
}

const insertThings = async (counter) => {
    for(let i = 0; i <=20; i++){
        counter = i;
        await lookUpEsi(counter).then(res => {
            insertIntoZkill(counter);
            insertIntoEsi(counter, res)
        }).catch(e => {
            console.log("bloop" + e)
        })
    }
}

const fillDbs = async () => {
    let counter;
    await insertThings(counter).then(() => {
        console.log('done')
    })
}

fillDbs();
setInterval(fillDbs, 1000 * 60 * 10);

module.exports = zkillRouter;