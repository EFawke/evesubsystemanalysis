const express = require('express');
const zkillRouter = express.Router();
const axios = require('axios');
const zkillDbInit = require('../utils/zkillTableInit');
const { Client } = require('pg');


// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

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
    return response.data;
}

const insertIntoZkill = async (num) => {
    pageNum = num
    const wormholeData = await axiosZkillData(pageNum);
    for (let i = 0; i < Object.keys(wormholeData).length; i++) {
        const currentZKillId = Object.keys(wormholeData)[i]
        const currentHash = Object.values(wormholeData)[i]
        let values = {
            $zkill_id: currentZKillId,
            $hash: currentHash
        };
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
        client.connect();
        client.query(`INSERT INTO zkill (zkill_id, hash) VALUES ($zkill_id, $hash)`, values,(err, res) => {
            if (err){
                console.log(err)
            }
            console.log(res)
            // console.log(res)
            // for (let row of res.rows) {
            //     console.log(JSON.stringify(row));
            // }
            client.end();
        });
        // db.run(`INSERT INTO zkill (zkill_id, hash) VALUES ($zkill_id, $hash)`,
        //     values
        //     , (err) => {
        //         if (err) {
        //             return;
        //         }
        //     })
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
        const response = await axios.get(`https://esi.evetech.net/latest/killmails/${currentZKillId}/${currentHash}/?datasource=tranquility`)
        killmails[i] = new Killmail(response.data.killmail_id, response.data.killmail_time, response.data.victim.ship_type_id, dateToDay(response.data.killmail_time))
    }
    return killmails;
}

const insertIntoEsi = async (num) => {
    let pageNum = num
    const killmails = await lookUpEsi(pageNum);
    for (let i = 0; i < killmails.length; i++) {
        const id = killmails[i].id;
        const date = killmails[i].date;
        const ship = killmails[i].ship;
        const day = killmails[i].day;
        client.connect();
        client.query(`INSERT INTO esi (killmail_id, killmail_time, ship_type_id, weekday) VALUES('${id}', '${date}', '${ship}', '${day}');`, (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
                console.log(JSON.stringify(row));
            }
            client.end();
        });

        // db.run(`INSERT INTO esi (killmail_id, killmail_time, ship_type_id, weekday)
        //         VALUES('${id}', '${date}', '${ship}', '${day}');`, (err) => {
        //     if (err) {
        //         return;
        //     }
        // })
    }
}

// const findTopZkillId = () => {
//     client.connect();
//     client.query(`SELECT MAX (killmail_id) FROM esi`, (err, rows) => {
//         if(err){
//             console.log(err);
//         }
//         return Object.values(rows)[0];
       
//     })
//     client.end()
    // db.get('SELECT MAX (killmail_id) FROM esi', (err, rows) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     return Object.values(rows)[0];
    // })
// }

// const highestZkillId = findTopZkillId()

const fillDbs = async () => {
    let counter;
    for (let i = 1; i <= 20; i++) {
        counter = i;
        await insertIntoZkill(counter);
        await insertIntoEsi(counter)
    }
}

fillDbs();
setInterval(fillDbs, 1000 * 60 * 10);

module.exports = zkillRouter;