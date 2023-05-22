// const axios = require('axios');
// const subsystemIDArr = [45622, 45623, 45624, 45625, 45626, 45627, 45628, 45629, 45630, 45631, 45632, 45633, 45586, 45587, 45588, 45589, 45590, 45591, 45592, 45593, 45594, 45595, 45596, 45597, 45610, 45611, 45612, 45613, 45614, 45615, 45616, 45617, 45618, 45619, 45620, 45621, 45598, 45599, 45600, 45601, 45602, 45603, 45604, 45605, 45606, 45607, 45608, 45609]

// const { Client } = require('pg');
// const date = new Date();
// const client = new Client()
// client.connect()
//     .catch(err => {
//         // console.log(err);
//     })
//     .then((res) => {
//         // console.log("client is connected")
//         // console.log(res);
//     })

// //make a database table to store the data
// client.query(`CREATE TABLE IF NOT EXISTS market_data (id BIGINT PRIMARY KEY, itemID BIGINT, name VARCHAR(255), amarr_buy VARCHAR(255), amarr_sell VARCHAR(255), amarr_buy_orders BIGINT, amarr_buy_volume BIGINT, amarr_sell_orders BIGINT, amarr_sell_volume BIGINT, jita_buy VARCHAR(255), jita_sell VARCHAR(255), jita_buy_orders BIGINT, jita_buy_volume BIGINT, jita_sell_orders BIGINT, jita_sell_volume BIGINT, date DATE NOT NULL, manufacture_cost_jita, manufacture_cost_amarr)`)
//     .catch(err => {
//         // console.log(err);
//     })
//     .then((res) => {
//         // console.log("table is created");
//         // console.log(res);
//     })

// const axiosEvepraisalData = () => {
//     console.log("fetching data from evepraisal");
//     const promises = [];
//     for (let i = 0; i < subsystemIDArr.length; i++) {
//         promises.push(axios.get(`http://evepraisal.com/item/${subsystemIDArr[i]}.json`));
//     }
//     axios.all(promises)
//         .then((results) => {
//             results.forEach((result) => {
//                 insertIntoPrices(result.data);
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             return;
//         })
// }

// //itemID BIGINT, name VARCHAR(255), amarr_buy VARCHAR(255), amarr_sell VARCHAR(255), amarr_buy_orders BIGINT, amarr_buy_volume BIGINT, amarr_sell_orders BIGINT, amarr_sell_volume BIGINT, jita_buy VARCHAR(255), jita_sell VARCHAR(255), jita_buy_orders BIGINT, jita_buy_volume BIGINT, jita_sell_orders BIGINT, jita_sell_volume BIGINT)')
// const insertIntoPrices = (data) => {
//     const itemId = data.type.id;
//     const name = data.type.name;
//     const summaries = data.summaries;
//     let amarrBuy = 0;
//     let amarrSell = 0;
//     let amarrBuyOrdersCount = 0;
//     let amarrBuyVolume = 0;
//     let amarrSellOrdersCount = 0;
//     let amarrSellVolume = 0;
//     let jitaBuy = 0;
//     let jitaSell = 0;
//     let jitaBuyOrdersCount = 0;
//     let jitaBuyVolume = 0;
//     let jitaSellOrdersCount = 0;
//     let jitaSellVolume = 0;
//     for (let i = 0; i < summaries.length; i++) {
//         if (summaries[i].market_name === 'amarr') {
//             amarrBuy = summaries[i].prices.buy.max;
//             amarrSell = summaries[i].prices.sell.min;
//             amarrBuyOrdersCount = summaries[i].prices.buy.order_count;
//             amarrBuyVolume = summaries[i].prices.buy.volume;
//             amarrSellOrdersCount = summaries[i].prices.sell.order_count;
//             amarrSellVolume = summaries[i].prices.sell.volume;
//         }
//         if (summaries[i].market_name === 'jita') {
//             jitaBuy = summaries[i].prices.buy.max;
//             jitaSell = summaries[i].prices.sell.min;
//             jitaBuyOrdersCount = summaries[i].prices.buy.order_count;
//             jitaBuyVolume = summaries[i].prices.buy.volume;
//             jitaSellOrdersCount = summaries[i].prices.sell.order_count;
//             jitaSellVolume = summaries[i].prices.sell.volume;
//         }
//     }

//     client.query(`UPDATE evepraisal_prices SET amarr_buy = '${amarrBuy}', amarr_sell = '${amarrSell}', amarr_buy_orders = ${amarrBuyOrdersCount}, amarr_buy_volume = ${amarrBuyVolume}, amarr_sell_orders = ${amarrSellOrdersCount}, amarr_sell_volume = ${amarrSellVolume}, jita_buy = '${jitaBuy}', jita_sell = '${jitaSell}', jita_buy_orders = ${jitaBuyOrdersCount}, jita_buy_volume = ${jitaBuyVolume}, jita_sell_orders = ${jitaSellOrdersCount}, jita_sell_volume = ${jitaSellVolume} WHERE itemID = ${itemId}`)
//         .catch(err => {
//             console.log("THERE WAS AN ERROR");
//             console.log(err);
//         })
//         .then((res) => {

//         })
// }

// axiosEvepraisalData();

// setInterval(axiosEvepraisalData, 300000);

// // const loggingTheDatabase = (databased) => {
// //     client.query(`SELECT * FROM ${databased}`)
// //         .catch(err => {
// //             console.log(err);
// //         })
// //         .then((res) => {
// //             return res;
// //         })
// // }


// // loggingTheDatabase('prices');
// // loggingTheDatabase('evepraisal_prices');