//this is a bit better. Go back and work on error handling.

const axios = require('axios');
const { Client } = require('pg');
const subsystemIDArr = [45622, 45623, 45624, 45625, 45626, 45627, 45628, 45629, 45630, 45631, 45632, 45633, 45586, 45587, 45588, 45589, 45590, 45591, 45592, 45593, 45594, 45595, 45596, 45597, 45610, 45611, 45612, 45613, 45614, 45615, 45616, 45617, 45618, 45619, 45620, 45621, 45598, 45599, 45600, 45601, 45602, 45603, 45604, 45605, 45606, 45607, 45608, 45609]
// const date = new Date();
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
    .catch(err => {
        // console.log(err);
    })
    .then((res) => {
        //console.log("client is connected")
    })

const makeTable = () => {
    client.query(`CREATE TABLE IF NOT EXISTS market_data (id BIGSERIAL, itemID BIGINT, name VARCHAR(255), amarr_buy VARCHAR(255), amarr_sell VARCHAR(255), amarr_buy_orders BIGINT, amarr_buy_volume BIGINT, amarr_sell_orders BIGINT, amarr_sell_volume BIGINT, jita_buy VARCHAR(255), jita_sell VARCHAR(255), jita_buy_orders BIGINT, jita_buy_volume BIGINT, jita_sell_orders BIGINT, jita_sell_volume BIGINT, date TIMESTAMP, manufacture_cost_jita VARCHAR(255), manufacture_cost_amarr VARCHAR(255))`)
    .catch(err => {
        console.log(err);
    })
    .then((res) => {
        //console.log("table is created");
    })
}

//drop market_data table
// const dropTable = () => {
//     client.query(`DROP TABLE market_data`)
//         .catch(err => {
//             console.log(err);
//         })
//         .then((res) => {
//             console.log("table is dropped");
//         })
// }

makeTable();
// dropTable();

const grabMaterialData = () => {
    const date = new Date();
    // console.log("getting data");
    for (let i = 0; i < subsystemIDArr.length; i++) {
        axios.get(`http://evepraisal.com/item/${subsystemIDArr[i]}.json`)
            .then((result) => {
                insertIntoPrices(result.data, date);
            })
            .catch(err => {
                console.log(err);
                return;
            })
    }
}

const insertIntoPrices = (data, date) => {
    let output = {};
    output.itemId = data.type.id;
    output.name = data.type.name;
    let summaries = data.summaries;
    output.base_components = data.type.base_components;
    output.date = date;
    output.amarrBuy = 0;
    output.amarrSell = 0;
    output.amarrBuyOrdersCount = 0;
    output.amarrBuyVolume = 0;
    output.amarrSellOrdersCount = 0;
    output.amarrSellVolume = 0;
    output.jitaBuy = 0;
    output.jitaSell = 0;
    output.jitaBuyOrdersCount = 0;
    output.jitaBuyVolume = 0;
    output.jitaSellOrdersCount = 0;
    output.jitaSellVolume = 0;
    for (let i = 0; i < summaries.length; i++) {
        if (summaries[i].market_name === 'amarr') {
            output.amarrBuy = summaries[i].prices.buy.max;
            output.amarrSell = summaries[i].prices.sell.min;
            output.amarrBuyOrdersCount = summaries[i].prices.buy.order_count;
            output.amarrBuyVolume = summaries[i].prices.buy.volume;
            output.amarrSellOrdersCount = summaries[i].prices.sell.order_count;
            output.amarrSellVolume = summaries[i].prices.sell.volume;
        }
        if (summaries[i].market_name === 'jita') {
            output.jitaBuy = summaries[i].prices.buy.max;
            output.jitaSell = summaries[i].prices.sell.min;
            output.jitaBuyOrdersCount = summaries[i].prices.buy.order_count;
            output.jitaBuyVolume = summaries[i].prices.buy.volume;
            output.jitaSellOrdersCount = summaries[i].prices.sell.order_count;
            output.jitaSellVolume = summaries[i].prices.sell.volume;
        }
    }
    getMaterialsPrice(output);
}

const getMaterialsPrice = (output) => {
    const promises2 = [];
    for (let i = 0; i < output.base_components.length; i++) {
        promises2.push(axios.get(`http://evepraisal.com/item/${output.base_components[i].type_id}.json`))
    }
    axios.all(promises2)
        .then((results) => {
            let totalJita = 0;
            let totalAmarr = 0;
            for (let i = 0; i < results.length; i++) {
                for (let j = 0; j < output.base_components.length; j++) {
                    const baseComponentId = output.base_components[j].type_id;
                    const currentId = results[i].data.type.id;
                    if (baseComponentId === currentId) {
                        const quantity = output.base_components[j].quantity;
                        const jitaBuy = results[i].data.summaries[0].prices.buy.max;
                        const amarrBuy = results[i].data.summaries[3].prices.buy.max;
                        totalJita += jitaBuy * quantity;
                        totalAmarr += amarrBuy * quantity;
                    }
                }
            }
            output.materialPriceJita = totalJita;
            output.materialPriceAmarr = totalAmarr;
            insertIntoTable(output);
        })
        .catch(err => {
            return;
        })
}

const insertIntoTable = (output) => {
    //format the date
    //output.date = output.date.toISOString();
    //remove the last 5 characters from output.date
    // output.date = output.date.slice(0, -5) + "Z";
    output.date = output.date.toISOString();
    // console.log(output.date);
    // console.log(output);
    const sql = "INSERT INTO market_data (itemid, name, amarr_buy, amarr_sell, amarr_buy_orders, amarr_buy_volume, amarr_sell_orders, amarr_sell_volume, jita_buy, jita_sell, jita_buy_orders, jita_buy_volume, jita_sell_orders, jita_sell_volume, date, manufacture_cost_jita, manufacture_cost_amarr) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ,$11, $12, $13, $14, $15, $16, $17)"
    const values = [output.itemId, output.name, output.amarrBuy, output.amarrSell, output.amarrBuyOrdersCount, output.amarrBuyVolume, output.amarrSellOrdersCount, output.amarrSellVolume, output.jitaBuy, output.jitaSell, output.jitaBuyOrdersCount, output.jitaBuyVolume, output.jitaSellOrdersCount, output.jitaSellVolume, output.date, output.materialPriceJita, output.materialPriceAmarr]
    client.query(sql, values)
        .then((res) => {
            // console.log(output.itemId + " inserted");
        })
        .catch(err => {
            console.log(err);
        })
}

//log market data to the console
const logMarketData = () => {
    const sql = "SELECT * FROM market_data";
    client.query(sql)
        .then((res) => {
            // console.log(res.rows.length);
            // console.log(res.rows)
        })
        .catch(err => {
            console.log(err);
        })
}

// logMarketData();

grabMaterialData()

const fiveMinutes = 300000;
const thirtyMinutes = 1800000;

setInterval(grabMaterialData, thirtyMinutes);