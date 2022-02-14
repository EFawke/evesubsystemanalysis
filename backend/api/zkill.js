const express = require('express');
const zkillRouter = express.Router();
const axios = require('axios');
const zkillDbInit = require('../utils/zkillTableInit');
const esiDbInit = require('../utils/esiDbInit');
const { Client } = require('pg');
const { query } = require('express');

esiDbInit();
zkillDbInit();

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
    if(response === undefined){
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
        if (currentZKillId < highestZkillId) {
            return;
        }
        const currentHash = Object.values(wormholeData)[i]
        await axios.get(`https://esi.evetech.net/latest/killmails/${currentZKillId}/${currentHash}/?datasource=tranquility`)
        .catch(err => {
            if (err) {
                return;
            }
        })
        .then((response) => {
            if(response){
                killmails[i] = new Killmail(response.data.killmail_id, response.data.killmail_time, response.data.victim.ship_type_id, dateToDay(response.data.killmail_time))
            }
        })
    }
    return killmails;
}

const insertIntoZkill = async (num, client) => {
    pageNum = num
    await axiosZkillData(pageNum)
    .catch((err) => {
        console.log(err);
        return;
    })
    .then((wormholeData) => {
        if(wormholeData){
            for (let i = 0; i < Object.keys(wormholeData).length; i++) {
                const currentZKillId = Object.keys(wormholeData)[i]
                const currentHash = Object.values(wormholeData)[i]
                const zkill_id = currentZKillId
                const hash = currentHash
                client.query(`INSERT INTO zkill (zkill_id, hash) VALUES ('${zkill_id}', '${hash}')`, (err, res) => {
                    if (err){
                        return
                        // console.log(err)
                    }
                    // console.log('floop')
                });
            }
        }
    })
    // client.end()
}

const insertIntoEsi = async (num) => {
    let pageNum = num
    await lookUpEsi(pageNum)
    .catch((err) => {
        console.log(err)
        return;
    })
    .then((killmails) => {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
        client.connect();
        for (let i = 0; i < killmails.length; i++) {
            console.log(killmails[i])
            const id = killmails[i].id;
            const date = killmails[i].date;
            const ship = killmails[i].ship;
            const day = killmails[i].day;
            client.query(`INSERT INTO esi (killmail_id, killmail_time, ship_type_id, weekday) VALUES('${id}', '${date}', '${ship}', '${day}');`, (err, res) => {
                if (err){
                    return;
                    // console.log(err)
                }
            });
        }
    })
}

const findTopZkillId = () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    client.query(`SELECT MAX (killmail_id) FROM esi`, (err, rows) => {
        if(err){
            // console.log(err);
        }
        // return Object.values(rows)[0];
       
    })
    client.query('SELECT MAX (killmail_id) FROM esi', (err, rows) => {
        if (err) {
            console.log(err);
        }
        // console.log(rows)
    })
    client.end()
}

const highestZkillId = findTopZkillId()

const insertThings = async (counter, client) => {
    for (let i = 1; i <= 20; i++) {
        counter = i;
        await insertIntoZkill(counter, client)
        await insertIntoEsi(counter)
    }
}

const fillDbs = async () => {
    let counter;
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    await insertThings(counter, client).then(() => {
        console.log('done')
        client.end()
    })
}

fillDbs();
setInterval(fillDbs, 1000 * 60 * 10);

module.exports = zkillRouter;