const axios = require('axios');
const { Client } = require('pg');

const subsystemIDArr = [45622, 45623, 45624, 45625, 45626, 45627, 45628, 45629, 45630, 45631, 45632, 45633, 45586, 45587, 45588, 45589, 45590, 45591, 45592, 45593, 45594, 45595, 45596, 45597, 45610, 45611, 45612, 45613, 45614, 45615, 45616, 45617, 45618, 45619, 45620, 45621, 45598, 45599, 45600, 45601, 45602, 45603, 45604, 45605, 45606, 45607, 45608, 45609]
const subsystems = [];
const promises = [];
const groupIDs = [];
let counter = 0;
const materials = [];
let defensive = 45595;
let offensive = 45607
let core = 45631
let propulsion = 45619
let output = {};
output.defensive = defensive;
output.offensive = offensive;
output.core = core;
output.propulsion = propulsion;
output.defMaterials = null;
let idsAndCounts = [];
let defensivePrice = 0;
let offensivePrice = 0;
let corePrice = 0;
let propulsionPrice = 0;

//create a table if it doesn't already exist called manufacturing_cost_data
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

// client.connect()
//     .then(() => {
//         return client.query(`CREATE TABLE IF NOT EXISTS manufacturing_cost_data (
//             id SERIAL PRIMARY KEY,
//             date DATE NOT NULL,
//             defensive VARCHAR(255) NOT NULL,
//             offensive VARCHAR(255) NOT NULL,
//             core VARCHAR(255) NOT NULL,
//             propulsion VARCHAR(255) NOT NULL,
//             )`)
//     })
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

axios.get(`http://evepraisal.com/item/${core}.json`)
    .then((result) => {
        return result.data.type.base_components
    })
    .then((base_components) => {
        base_components.forEach((component) => {
            idsAndCounts.push(component)
            promises.push(axios.get(`http://evepraisal.com/item/${component.type_id}.json`))
        })
        return axios.all(promises)
    })
    .then((results) => {
        results.forEach((result) => {
            for (let i = 0; i < idsAndCounts.length; i++) {
                if (result.data.type.id === idsAndCounts[i].type_id) {
                    // console.log(result.data.summaries[0].market_name)
                    // console.log(result.data.type.name)
                    // console.log(`${result.data.type.name} times ${idsAndCounts[i].quantity} = ${result.data.type.id * idsAndCounts[i].quantity}`)
                    corePrice += result.data.summaries[0].prices.buy.max * idsAndCounts[i].quantity
                }
            }
        })
        console.log("core price is " + corePrice)
    })
    .catch(err => {
        console.log(err);
        return;
    })

axios.get(`http://evepraisal.com/item/${defensive}.json`)
    .then((result) => {
        return result.data.type.base_components
    })
    .then((base_components) => {
        base_components.forEach((component) => {
            idsAndCounts.push(component)
            promises.push(axios.get(`http://evepraisal.com/item/${component.type_id}.json`))
        })
        return axios.all(promises)
    })
    .then((results) => {
        results.forEach((result) => {
            for (let i = 0; i < idsAndCounts.length; i++) {
                if (result.data.type.id === idsAndCounts[i].type_id) {
                    // console.log(result.data.summaries[0].market_name)
                    // console.log(result.data.type.name)
                    // console.log(`${result.data.type.name} times ${idsAndCounts[i].quantity} = ${result.data.type.id * idsAndCounts[i].quantity}`)
                    defensivePrice += result.data.summaries[0].prices.buy.max * idsAndCounts[i].quantity
                }
            }
        })
        console.log("defensive price is " + defensivePrice)
    })
    .catch(err => {
        console.log(err);
        return;
    })

axios.get(`http://evepraisal.com/item/${offensive}.json`)
    .then((result) => {
        return result.data.type.base_components
    })
    .then((base_components) => {
        base_components.forEach((component) => {
            idsAndCounts.push(component)
            promises.push(axios.get(`http://evepraisal.com/item/${component.type_id}.json`))
        })
        return axios.all(promises)
    })
    .then((results) => {
        results.forEach((result) => {
            for (let i = 0; i < idsAndCounts.length; i++) {
                if (result.data.type.id === idsAndCounts[i].type_id) {
                    // console.log(result.data.summaries[0].market_name)
                    // console.log(result.data.type.name)
                    // console.log(`${result.data.type.name} times ${idsAndCounts[i].quantity} = ${result.data.type.id * idsAndCounts[i].quantity}`)
                    offensivePrice += result.data.summaries[0].prices.buy.max * idsAndCounts[i].quantity
                }
            }
        })
        console.log("offensive price is " + offensivePrice)
    })
    .catch(err => {
        console.log(err);
        return;
    })

//propulsion
axios.get(`http://evepraisal.com/item/${propulsion}.json`)
    .then((result) => {
        return result.data.type.base_components
    })
    .then((base_components) => {
        base_components.forEach((component) => {
            idsAndCounts.push(component)
            promises.push(axios.get(`http://evepraisal.com/item/${component.type_id}.json`))
        })
        return axios.all(promises)
    })
    .then((results) => {
        results.forEach((result) => {
            for (let i = 0; i < idsAndCounts.length; i++) {
                if (result.data.type.id === idsAndCounts[i].type_id) {
                    // console.log(result.data.summaries[0].market_name)
                    // console.log(result.data.type.name)
                    // console.log(`${result.data.type.name} times ${idsAndCounts[i].quantity} = ${result.data.type.id * idsAndCounts[i].quantity}`)
                    propulsionPrice += result.data.summaries[0].prices.buy.max * idsAndCounts[i].quantity
                }
            }
        })
        console.log("propulsion price is " + propulsionPrice)
    })
    .catch(err => {
        console.log(err);
        return;
    })