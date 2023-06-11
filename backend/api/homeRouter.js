const express = require('express');
// const { data } = require('jquery');
const homeRouter = express.Router();
const { Client } = require('pg');

let data = {};

homeRouter.get('/', (req, res, next) => {
    let client;
    let today = new Date();
    let lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 6);
    today = today.toISOString();
    lastWeek = lastWeek.toISOString();
    lastWeek = lastWeek.slice(0, -14) + "T00:00:00.000Z";
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
    client.connect();
    const sql = `SELECT type_id, type_name, COUNT(type_id) AS occurrence_count
    FROM subsystems
    WHERE killTime BETWEEN '${lastWeek}' AND '${today}'
    GROUP BY type_id, type_name
    ORDER BY occurrence_count ASC;`;
    client.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            data.destroyed = result.rows;
            next();
            client.end();
        }
    })
})

homeRouter.get('/', (req, res, next) => {
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
    client.connect();

    //write an sql query to get unique names from the market_data table ordered by date descending and only return one for each name
    const sql = `SELECT DISTINCT ON (name) * FROM market_data ORDER BY name, date DESC;`;

    client.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            client.end();
        } else {
            latest = result.rows;
            latest.sort((a, b) => (a.jita_sell < b.jita_sell) ? 1 : -1)
            const mostProfitable = {}
            for (let i = 0; i < latest.length; i++) {

                if (latest[i].name.includes("Defensive")) {
                    if (!mostProfitable["Defensive"]) {
                        mostProfitable["Defensive"] = latest[i]
                    }
                }
                if (latest[i].name.includes("Core")) {
                    if (!mostProfitable["Core"]) {
                        mostProfitable["Core"] = latest[i]
                    }
                }
                if (latest[i].name.includes("Offensive")) {
                    if (!mostProfitable["Offensive"]) {
                        mostProfitable["Offensive"] = latest[i]
                    }
                }
                if (latest[i].name.includes("Propulsion")) {
                    if (!mostProfitable["Propulsion"]) {
                        mostProfitable["Propulsion"] = latest[i]
                    }
                }
            }

            data.profitRank = latest.sort((a, b) => (a.jita_sell - a.material_cost < b.jita_sell - b.material_cost) ? 1 : -1)
            data.buySellRatioRank = latest.sort((a, b) => (a.jita_sell_volume / a.jita_buy_volume < b.jita_sell_volume / b.jita_buy_volume) ? 1 : -1)
            data.recommendedRank = tallyResults(data.buySellRatioRank, data.destroyed)
            data.profit = mostProfitable;

            res.status(200).send(data);
            client.end();
        }
    })
})

function tallyResults(buySellRatioRank, destroyed) {
    
    let end = destroyed.length - 10;
    destroyed.splice(0, end);
    console.log(destroyed)
    for(let i = 0; i < destroyed.length; i++){
        for(let j = 0; j < buySellRatioRank.length; j++) {
            if(destroyed[i].type_id === buySellRatioRank[j].itemid) {
                destroyed[i].amarr_sell = buySellRatioRank[j].amarr_sell;
                destroyed[i].amarr_sell_volume = buySellRatioRank[j].amarr_sell_volume;
                destroyed[i].amarr_sell_orders = buySellRatioRank[j].amarr_sell_orders;
                destroyed[i].amarr_buy = buySellRatioRank[j].amarr_buy;
                destroyed[i].amarr_buy_volume = buySellRatioRank[j].amarr_buy_volume;
                destroyed[i].amarr_buy_orders = buySellRatioRank[j].amarr_buy_orders;
                destroyed[i].jita_sell = buySellRatioRank[j].jita_sell;
                destroyed[i].jita_sell_volume = buySellRatioRank[j].jita_sell_volume;
                destroyed[i].jita_sell_orders = buySellRatioRank[j].jita_sell_orders;
                destroyed[i].jita_buy = buySellRatioRank[j].jita_buy;
                destroyed[i].jita_buy_volume = buySellRatioRank[j].jita_buy_volume;
                destroyed[i].jita_buy_orders = buySellRatioRank[j].jita_buy_orders;
                destroyed[i].manufacture_cost_jita = buySellRatioRank[j].manufacture_cost_jita;
                destroyed[i].manufacture_cost_amarr = buySellRatioRank[j].manufacture_cost_amarr;
                let jita_profits_num = buySellRatioRank[j].jita_sell - buySellRatioRank[j].manufacture_cost_jita;
                destroyed[i].jita_profits_with_commas = jita_profits_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                destroyed[i].jita_profits = jita_profits_num
                let amarr_profits_num = buySellRatioRank[j].amarr_sell - buySellRatioRank[j].manufacture_cost_amarr;
                destroyed[i].amarr_profits_with_commas = amarr_profits_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                destroyed[i].amarr_profits = amarr_profits_num;
                destroyed[i].jitaBuySellRatio = buySellRatioRank[j].jita_sell_volume / buySellRatioRank[j].jita_buy_volume;
                destroyed[i].amarrBuySellRatio = buySellRatioRank[j].amarr_sell_volume / buySellRatioRank[j].amarr_buy_volume;
            }
        }
    }

    let output = {};

    output.jitaRank = destroyed.sort((a, b) => (a.jita_profits < b.jita_profits) ? 1 : -1);

    return output;
}

module.exports = homeRouter;