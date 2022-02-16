const express = require('express');
const zkillRouter = express.Router();
const axios = require('axios');
const zkillDbInit = require('../utils/zkillTableInit');
const esiDbInit = require('../utils/esiDbInit');
var format = require('pg-format');
const { Client } = require('pg');
const { query, response } = require('express');

esiDbInit();

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
    if (wormholeData === undefined) {
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

const sqlInject = async (data) => {
    console.log(data.id)
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        allowExitOnIdle: true
    });
    client.connect()
    client.query(`INSERT INTO esi (killmail_id, killmail_time, ship_type_id, weekday) VALUES ('${data.id}', '${data.date}', '${data.ship}', '${data.day}')`, (err, res) => {
        if (err) {
            client.end()
        } else {
            client.end()
            console.log('esi value inserted');
        }
    })
}

const insertIntoEsiDatabase = async (num) => {
    const data = await lookUpEsi(num)
    for (let i = 0; i < data.length; i++) {
        await sqlInject(data[i])
    }
}

const fillDbs = async () => {
    console.log('filling db')
    for (let i = 0; i <= 20; i++) {
        await insertIntoEsiDatabase(i)
    }
}

fillDbs()
setInterval(fillDbs, 1000 * 60 * 10);

module.exports = zkillRouter;


// const sqlEsi = async (id, date, ship, day, client) => {
//     client.query(`INSERT INTO esi (killmail_id, killmail_time, ship_type_id, weekday) VALUES ('${id}', '${date}', '${ship}', '${day}')`, (err, res) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log('esi value inserted');
//         }
//     })
// }

// const insertionsForEsi = async (client, values) => {
//     for (let i = 0; i < values.length; i++) {
//         await sqlEsi(values[i].id, values[i].date, values[i].ship, values[i].day, client)
//     }
// }

// const performEsiInsertions = async (values, client) => {
//     await insertionsForEsi(client, values)
// }

// const insertIntoEsi = async (counter, client) => {
//     await lookUpEsi(counter).then((res) => {
//         if (res === undefined) {
//             return
//         }
//         performEsiInsertions(res, client)
//     })
// }

// const insertThings = async () => {
//     for (let i = 0; i <= 20; i++) {
//         await insertIntoEsi(i, client)
//             .catch(e => {
//                 console.log(e)
//                 console.log('error inserting into esi on line 190')
//             })
//             .then(() => {
//                 client.end()
//             })
//     }
// }

// const fillDbs = async () => {
//     await insertThings().then(() => {
//         console.log('done')
//     })
// }

// fillDbs();
