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
    if (page > 20) {
        return;
    }
    let query;
    if (page === 0) {
        query = 'https://zkillboard.com/api/kills/w-space/'
    } else {
        query = `https://zkillboard.com/api/kills/w-space/page/${page}/`
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
        return response.data
    }
}

const lookUpEsi = async (wormholeData, id) => {
    if (wormholeData === undefined) {
        return;
    }
    for (let i = 0; i < Object.keys(wormholeData).length; i++) {
        const newzKillId = Object.keys(wormholeData)[i]
        const currentHash = Object.values(wormholeData)[i]
        if(Number(id) > newzKillId){
            continue
        } else {
            // console.log('querying the esi')
        }
        await axios.get(`https://esi.evetech.net/latest/killmails/${newzKillId}/${currentHash}/?datasource=tranquility`)
            .catch(err => {
                console.log(err)
            })
            .then((response) => {
                sqlInject(response)
            })
    }
}

const sqlInject = async (response) => {
    if(response === undefined){
        //responses come back undefined during downtime, causing the app to crash
        return
    }
    const id = response.data.killmail_id
    const date = response.data.killmail_time
    const ship = response.data.victim.ship_type_id
    const day = dateToDay(response.data.killmail_time)
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        allowExitOnIdle: true
    });
    client.connect()
    client.query(`INSERT INTO esi (killmail_id, killmail_time, ship_type_id, weekday) VALUES ('${id}', '${date}', '${ship}', '${day}')`, (err, res) => {
        client.end()
        if (err) {
            client.end()
            // console.log('value already inserted, probably')
        } else {
            client.end()
            // console.log('esi value inserted');
        }
    })
}

const insertIntoEsiDatabase = async (num, id) => {
    await axiosZkillData(num).then((wormholeData) => {
        lookUpEsi(wormholeData, id)
    })
}

const go = async (id) => {
    for (let i = 20; i >= 0; i--) {
        console.log(i)
        await insertIntoEsiDatabase(i, id)
    }
}

const findMax = async () => {
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
        return res.rows[0].max
    })
}

const fillDbs = async () => {
    await findMax().then((res) => {
        console.log(res)
        go(res)
    })
}

fillDbs()
setInterval(fillDbs, 1000 * 60 * 10);

module.exports = zkillRouter;