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
    console.log(page)
    let query;
    if (page === 0) {
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
    if(wormholeData === undefined){
        return;
    }
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

const insertionsForZkill = async (client, wormholeData) => {
    for(let i = 0; i < Object.keys(wormholeData).length; i ++){
        client.query(`INSERT INTO zkill (zkill_id, hash) VALUES ('${Object.keys(wormholeData)[i]}', '${Object.values(wormholeData)[i]}')`, (err, res) => {
            if(err){
                // console.log('zkill duplicate key')
            } else {
                console.log('zkill value inserted');
            }
        })
    }
}

const performzKillInsertions = async (wormholeData) => {
    const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    allowExitOnIdle: true
    });
    client.connect()
    await insertionsForZkill(client, wormholeData)
    .then((res) => {
        client.end()
    })
    .catch((e) => {
        console.log(e)
        client.end()
    })
}

const insertIntoZkill = async (num) => {
    await axiosZkillData(num).then((wormholeData) => {
        if(wormholeData === undefined){
            console.log('the api failed')
            return;
        }
        if (wormholeData) {
            performzKillInsertions(wormholeData)
        }
    })
}

const sqlEsi = async (id, date, ship, day, client) => {
    client.query(`INSERT INTO esi (killmail_id, killmail_time, ship_type_id, weekday) VALUES ('${id}', '${date}', '${ship}', '${day}')`, (err, res) => {
        if(err){
            console.log(err)
        } else {
            console.log('esi value inserted');
        }
    })
}

const insertionsForEsi = async (client, values) => {
    for(let i = 0; i < values.length; i++){
        await sqlEsi(values[i].id, values[i].date, values[i].ship, values[i].day, client)
    }
}

const performEsiInsertions = async (values) => {
    // console.log('inserting this into esi ' + values + 'inserting this into esi')
        const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        allowExitOnIdle: true
        });
        client.connect()
        await insertionsForEsi(client, values)
        .then((res) => {
            client.end()
        })
        // .catch((e) => {
        //     console.log(e)
        //     client.end()
        // })
}

const insertIntoEsi = async (counter) => {
    await lookUpEsi(counter).then((res) => {
        if(res === undefined){
            return
        }
        performEsiInsertions(res)
    })
}

const insertThings = async () => {
    for (let i = 0; i <= 20; i++) {
        await insertIntoZkill(i)
            .catch(e => {
                console.log('error inserting into zkill on line 186')
            })
        await insertIntoEsi(i)
            .catch(e => {
                console.log(e)
                console.log('error inserting into esi on line 190')
            })
    }
}

const fillDbs = async () => {
    await insertThings().then(() => {
        console.log('done')
    })
}

fillDbs();
setInterval(fillDbs, 1000 * 60 * 10);

module.exports = zkillRouter;