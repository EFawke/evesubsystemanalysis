const express = require('express');
const zkillRouter = express.Router();
const axios = require('axios');
const zkillDbInit = require('../utils/zkillTableInit');
const esiDbInit = require('../utils/esiDbInit');
var format = require('pg-format');
const { Client } = require('pg');
const { query, response } = require('express');

// esiDbInit();

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
        })
        .catch(err => {
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

const lookUpEsi = async (num, id) => {
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
    if (wormholeData === undefined) {
        return;
    }
    for (let i = 0; i < Object.keys(wormholeData).length; i++) {
        const currentZKillId = Object.keys(wormholeData)[i]
        const currentHash = Object.values(wormholeData)[i]
        if(id > currentZKillId){
            continue
        }
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
    console.log(killmails)
    return killmails;
}

const sqlInject = async (data) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        allowExitOnIdle: true
    });
    client.connect()
    client.query(`INSERT INTO esi (killmail_id, killmail_time, ship_type_id, weekday) VALUES ('${data.id}', '${data.date}', '${data.ship}', '${data.day}')`, (err, res) => {
        client.end()
        if (err) {
            client.end()
        } else {
            client.end()
            console.log('esi value inserted');
        }
    })
}

const insertIntoEsiDatabase = async (num, id) => {
    await lookUpEsi(num, id)
    .then((data) => {
        if(!data){
            return;
        }
        for (let i = 0; i < data.length; i++) {
            if(!data[i]){
                return;
            } else {
                sqlInject(data[i])
            }
        }
    })
}

const fillDbs = () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        allowExitOnIdle: true
    });
    client.connect()
    client.query(`SELECT MAX (killmail_id) FROM esi`, (err, res) => {
        client.end()
        if(err){
            console.log(err)
        }
        console.log(res)
        console.log('filling db')
        for (let i = 0; i <= 20; i++) {
            insertIntoEsiDatabase(i, res)
        }
    })
}

// const fillDbs = async () => {
//     await getMaxKillmailId().then((id) => {
//         console.log('filling db')
//         for (let i = 0; i <= 20; i++) {
//             insertIntoEsiDatabase(i, id)
//         }
//     })
// }

fillDbs()
setInterval(fillDbs, 1000 * 60 * 10);

module.exports = zkillRouter;