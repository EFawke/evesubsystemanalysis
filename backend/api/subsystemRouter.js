const express = require('express');
const shipTypeRouter = express.Router();
const { Client } = require('pg');

const subsystemIDArr = ["all", "45622", "45623", "45624", "45625", "45626", "45627", "45628", "45629", "45630", "45631", "45632", "45633", "45586", "45587", "45588", "45589", "45590", "45591", "45592", "45593", "45594", "45595", "45596", "45597", "45610", "45611", "45612", "45613", "45614", "45615", "45616", "45617", "45618", "45619", "45620", "45621", "45598", "45599", "45600", "45601", "45602", "45603", "45604", "45605", "45606", "45607", "45608", "45609"]
let output = {};

shipTypeRouter.get(`/:subsystemID`, (req, res, next) => {
    if (!req.params.subsystemID || !subsystemIDArr.includes(req.params.subsystemID)) {
        res.status(400).send("Invalid subsystem ID");
        return;
    } else {
        let today = new Date();
        let lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 6);
        today = today.toISOString();
        lastWeek = lastWeek.toISOString();
        lastWeek = lastWeek.slice(0, -14) + "T00:00:00.000Z";
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
            })

            output.heatmap = heatmap;
            output.graphData = graphData;
            output.pieChart = pieChartData;
            next();
        })
    }
})

shipTypeRouter.get(`/:subsystemID`, (req, res, next) => {
    if (!req.params.subsystemID || !subsystemIDArr.includes(req.params.subsystemID)) {
        res.status(400).send("Invalid subsystem ID");
        return;
    } else {
        const today = new Date(); // Get the current date

        const lastWeek = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000); // Subtract 6 days from the current date to include today

        const todayDateString = today.toISOString().split('T')[0]; // Get the current date string without the time

        const query = `
  SELECT
    ROUND(AVG(CAST(amarr_buy_volume AS FLOAT))) AS avg_amarr_buy_volume,
    ROUND(AVG(CAST(amarr_sell_volume AS FLOAT))) AS avg_amarr_sell_volume,
    ROUND(AVG(CAST(jita_buy_volume AS FLOAT))) AS avg_jita_buy_volume,
    ROUND(AVG(CAST(jita_sell_volume AS FLOAT))) AS avg_jita_sell_volume,
    ROUND(AVG(CAST(manufacture_cost_jita AS FLOAT))) AS avg_manufacture_cost_jita,
    ROUND(AVG(CAST(manufacture_cost_amarr AS FLOAT))) AS avg_manufacture_cost_amarr,
    DATE_TRUNC('day', date) AS day
  FROM
    market_data
  WHERE
    date >= '${lastWeek.toISOString()}'::date AND
    date <= CURRENT_DATE
  GROUP BY
    DATE_TRUNC('day', date)
  ORDER BY
    DATE_TRUNC('day', date) ASC;
`;







        //DATE_TRUNC('day', date::timestamptz AT TIME ZONE 'GMT') AS day



        //lastWeek = lastWeek.slice(0, -14) + "T00:00:00.000Z";
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
        client.query(query, (err, response) => {
            client.end();
            if (err) {
                console.log(err);
                res.status(404).send(output);
                return;
            }
            if (response.rows) {
                //console.log(response.rows);
                //for each row console.log row
                response.rows.forEach((row) => {
                    //console.log(row);
                })
                output.marketData = response.rows;
            }
            next();
        })
    }
})

shipTypeRouter.get(`/:subsystemID`, (req, res, next) => {
    if (!req.params.subsystemID || !subsystemIDArr.includes(req.params.subsystemID)) {
        res.status(400).send("Invalid subsystem ID");
        return;
    }
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

    let today = new Date();
    let lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 6);
    today = today.toISOString();
    lastWeek = lastWeek.toISOString();
    lastWeek = lastWeek.slice(0, -14) + "T00:00:00.000Z";

    const sql = `
        SELECT *
        FROM market_data
        WHERE itemid = ${id}
            AND date BETWEEN '${lastWeek}' AND '${today}'
        ORDER BY date ASC;`;

    client.query(sql, (err, response) => {
        if (err) {
            client.end();
            console.log(err);
            return;
        }

        client.end();
        //output.marketData = response.rows;
        const currentHighestSellPrice = response.rows[0].jita_sell;
        const currentHighestSellPriceAmarr = response.rows[0].amarr_sell;
        output.name = response.rows[0].name;
        output.currentHighestSellPrice = currentHighestSellPrice;
        output.currentHighestSellPriceAmarr = currentHighestSellPriceAmarr;
        let lastSevenDays = []
        for (let i = 0; i < 7; i++) {
            let date = new Date();
            date.setDate(date.getDate() - i);
            date = date.toISOString().slice(0, 10);
            lastSevenDays.push(date);
        }


        //sort the array of the last seven days
        lastSevenDays.sort((a, b) => {
            return new Date(a) - new Date(b);
        })


        const averages = {};
        const priceAverages = {};
        response.rows.forEach((row) => {
            let date = row.date
            date = date.toISOString().slice(0, 10);
            for (let i = 0; i < lastSevenDays.length; i++) {
                if (date === lastSevenDays[i]) {
                    if (averages[date]) {
                        averages[date].buy += Number(row.jita_buy_volume);
                        averages[date].sell += Number(row.jita_sell_volume);
                        averages[date].amarr_buy += Number(row.amarr_buy_volume);
                        averages[date].amarr_sell += Number(row.amarr_sell_volume);
                        averages[date].count += 1;
                        averages[date].amarr_count += 1;
                    }
                    if (!averages[date]) {
                        averages[date] = {};
                        averages[date].buy = Number(row.jita_buy_volume);
                        averages[date].sell = Number(row.jita_sell_volume);
                        averages[date].amarr_buy = Number(row.amarr_buy_volume);
                        averages[date].amarr_sell = Number(row.amarr_sell_volume);
                        averages[date].count = 1;
                        averages[date].amarr_count = 1;
                    }
                    //price averages now
                    if (priceAverages[date]) {
                        priceAverages[date].buy += Number(row.jita_buy);
                        priceAverages[date].sell += Number(row.jita_sell);
                        priceAverages[date].amarr_buy += Number(row.amarr_buy);
                        priceAverages[date].amarr_sell += Number(row.amarr_sell);
                        priceAverages[date].manufacture_cost_jita += Number(row.manufacture_cost_jita);
                        priceAverages[date].manufacture_cost_amarr += Number(row.manufacture_cost_amarr);
                        priceAverages[date].manufacture_cost_jita_count += 1;
                        priceAverages[date].manufacture_cost_amarr_count += 1;
                        priceAverages[date].count += 1;
                        priceAverages[date].amarr_count += 1;
                    }
                    if (!priceAverages[date]) {
                        priceAverages[date] = {};
                        priceAverages[date].buy = Number(row.jita_buy);
                        priceAverages[date].sell = Number(row.jita_sell);
                        priceAverages[date].amarr_buy = Number(row.amarr_buy);
                        priceAverages[date].amarr_sell = Number(row.amarr_sell);
                        priceAverages[date].manufacture_cost_jita = Number(row.manufacture_cost_jita);
                        priceAverages[date].manufacture_cost_amarr = Number(row.manufacture_cost_amarr);
                        priceAverages[date].manufacture_cost_jita_count = 1;
                        priceAverages[date].manufacture_cost_amarr_count = 1;
                        priceAverages[date].count = 1;
                        priceAverages[date].amarr_count = 1;
                    }
                }
            }
        })

        //for each date in averages, divide the buy/sell volume by the count
        for (let date in averages) {
            averages[date].buy = averages[date].buy / averages[date].count;
            averages[date].sell = averages[date].sell / averages[date].count;
            //and amarr
            averages[date].amarr_buy = averages[date].amarr_buy / averages[date].amarr_count;
            averages[date].amarr_sell = averages[date].amarr_sell / averages[date].amarr_count;
        }

        //for each date in priceAverages, divide the buy/sell volume by the count
        for (let date in priceAverages) {
            priceAverages[date].buy = priceAverages[date].buy / priceAverages[date].count;
            priceAverages[date].sell = priceAverages[date].sell / priceAverages[date].count;
            //and amarr
            priceAverages[date].amarr_buy = priceAverages[date].amarr_buy / priceAverages[date].amarr_count;
            priceAverages[date].amarr_sell = priceAverages[date].amarr_sell / priceAverages[date].amarr_count;
            //and manufacture cost
            priceAverages[date].manufacture_cost_jita = priceAverages[date].manufacture_cost_jita / priceAverages[date].manufacture_cost_jita_count;
            priceAverages[date].manufacture_cost_amarr = priceAverages[date].manufacture_cost_amarr / priceAverages[date].manufacture_cost_amarr_count;
        }

        //make the priceAverages into nice round numbers
        for (let date in priceAverages) {
            priceAverages[date].buy = Math.round(priceAverages[date].buy);
            priceAverages[date].sell = Math.round(priceAverages[date].sell);
            //and amarr
            priceAverages[date].amarr_buy = Math.round(priceAverages[date].amarr_buy);
            priceAverages[date].amarr_sell = Math.round(priceAverages[date].amarr_sell);
            //and manufacture cost
            priceAverages[date].manufacture_cost_jita = Math.round(priceAverages[date].manufacture_cost_jita);
            priceAverages[date].manufacture_cost_amarr = Math.round(priceAverages[date].manufacture_cost_amarr);
        }
        //assign the averages to the output
        output.priceAverages = priceAverages;

        output.lastSevenDays = lastSevenDays;
        output.averageQuants = averages;



        //perform all of the calculations for the graphs here instead of in the browser, and only output what is necessary.

        //res.status(200).send(output);
        next();
    })
})

shipTypeRouter.get(`/:subsystemID`, (req, res, next) => {
    if (!req.params.subsystemID || !subsystemIDArr.includes(req.params.subsystemID)) {
        res.status(400).send("Invalid subsystem ID");
        return;
    } else {
        const getSubsystemRank = (piechart) => {
            const num_des = output.pieChart[output.name].count;
            let rank = 1;
            for (let i = 0; i < Object.keys(piechart).length; i++) {
                if (piechart[Object.keys(piechart)[i]].count > num_des) {
                    rank += 1
                }
            }
            return rank
        }

        // const apiKey = "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";
        // const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

        const jitaBuild = output.priceAverages[output.lastSevenDays[6]].manufacture_cost_jita;
        const jitaProfit = output.currentHighestSellPrice - jitaBuild;
        const num_des = output.pieChart[output.name].count;
        const subsystemRank = getSubsystemRank(output.pieChart);
        let percentageOfTotal = ((num_des / 48) * 100).toFixed(2);

        const prompt = `
    Subsystem name: ${output.name}.
In the last 7 days, ${num_des} ${output.name} subsystems have been lost by players, accounting for ${percentageOfTotal} of subsystem losses this week. If we assume this is an indication of the demand, that makes it rank ${subsystemRank} out of 48.
Based on the market data, you can build this subsystem for about ${jitaBuild} and sell it for ${output.currentHighestSellPrice}, a difference of ${jitaProfit}.
Given that you can only produce a finite number of subsystems per day, and that you have a finite amount of capital, should you produce this subsystem?
Answer in 1-2 sentences. Use data to support your answer.`
        
        output.prompt = prompt;

        res.status(200).send(output)
    }
})

const removeEntryIfTooOld = (arrayOfResponses, today, lastWeek) => {
    const output = [];
    arrayOfResponses.forEach((response) => {
        let killTime;
        if (!response.killtime) {
            killTime = new Date(response.date);
        } else {
            killTime = new Date(response.killtime);
        }
        if (killTime > new Date(lastWeek) && killTime < new Date(today)) {
            output.push(response);
        }
    })
    return output;
}

module.exports = shipTypeRouter;