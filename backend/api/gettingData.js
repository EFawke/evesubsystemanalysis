console.log("Gonna grab the data from zkillboard.com");
const axios = require('axios');
const { Client } = require('pg');
const subsystemIDArr = [45622, 45623, 45624, 45625, 45626, 45627, 45628, 45629, 45630, 45631, 45632, 45633, 45586, 45587, 45588, 45589, 45590, 45591, 45592, 45593, 45594, 45595, 45596, 45597, 45610, 45611, 45612, 45613, 45614, 45615, 45616, 45617, 45618, 45619, 45620, 45621, 45598, 45599, 45600, 45601, 45602, 45603, 45604, 45605, 45606, 45607, 45608, 45609]
const coreSybsystems = [45622, 45623, 45624, 45625, 45626, 45627, 45628, 45629, 45630, 45631, 45632, 45633];
const offensiveSubsystems = [45598, 45599, 45600, 45601, 45602, 45603, 45604, 45605, 45606, 45607, 45608, 45609];
const propulsionSubsystems = [45610, 45611, 45612, 45613, 45614, 45615, 45616, 45617, 45618, 45619, 45620, 45621];
const defensiveSubsystems = [45586, 45587, 45588, 45589, 45590, 45591, 45592, 45593, 45594, 45595, 45596, 45597];
const checkType = (itemID) => {
    if (coreSybsystems.includes(itemID)) {
        console.log("core subsystem")
        return 'core';
    }
    if (offensiveSubsystems.includes(itemID)) {
        console.log("offensive subsystem")
        return 'offensive';
    }
    if (propulsionSubsystems.includes(itemID)) {
        console.log("propulsion subsystem")
        return 'propulsion';
    }
    if (defensiveSubsystems.includes(itemID)) {
        console.log("defensive subsystem")
        return 'defensive';
    }
}

const client = new Client()
client.connect()
    .catch(err => {
        console.log("database is down");
        console.log(err);
    })

//make a database table to store the data
client.query('CREATE TABLE IF NOT EXISTS kills (killID BIGINT, hash VARCHAR(255), killTime TIMESTAMP, link VARCHAR(255))')
    .catch(err => {
        console.log("error creating table");
        console.log(err);
    })

//make a table to store the killmails should have a foreign key to the killID in the kills table, an attackers column, a victim column, a killmail_time column and a solar system id.
client.query('CREATE TABLE IF NOT EXISTS subsystems (killID BIGINT, type VARCHAR(255), name VARCHAR(255), itemID BIGINT, killmail_time TIMESTAMP, solar_system_id BIGINT, link VARCHAR(255))')
    .catch(err => {
        console.log("error creating killmails table");
        console.log(err);
    })

const pingZkill = () => {
    axios("https://redisq.zkillboard.com/listen.php?ttw=1", {
        headers: {
            'accept-encoding': 'gzip',
            'user-agent': 'Johnson Kanjus - rage-roll.com - teduardof@gmail.com',
            'connection': 'close'
        }
    })
        .catch(err => {
            if (err) {
                console.log("error pinging zkillboard");
                console.log(err);
                return;
            }
        })
        .then(response => {
            if (!response) {
                return;
            }
            if(!response.data){
                return;
            }
            if (response.data.package === null) {
                console.log("no data");
                return;
            }
            if (response && response.data.package !== null && response.data.package !== undefined) {
                console.log(response.data.package.killID);
                const killID = response.data.package.killID;
                const hash = response.data.package.zkb.hash;
                const killTime = response.data.package.killmail.killmail_time;
                const link = response.data.package.zkb.href;
                insertIntoDB(killID, hash, killTime, link);
            }
        });
}

//function to insert response into database
const insertIntoDB = (killID, hash, killTime, link) => {
    client.query('INSERT INTO kills (killID, hash, killTime, link) VALUES ($1, $2, $3, $4)', [killID, hash, killTime, link])
        .then(() => {
            // console.log("inserted into database");
            axios.get(`https://esi.evetech.net/latest/killmails/${killID}/${hash}/?datasource=tranquility`)
                .catch(err => {
                    console.log(err)
                })
                .then(res => {
                    if (res.status !== 200) {
                        console.log(res.status)
                        return;
                    }
                    const victimShip = res.data.victim.ship_type_id;
                    //if victimShip is not either 29986, 29984, 29988 or 29990 then return else insert Into Killmails Table
                    if (victimShip !== 29986 && victimShip !== 29984 && victimShip !== 29988 && victimShip !== 29990) {
                        console.log("Not a Tech 3 Cruiser");
                        return;
                    } else {
                        //switch statement to get the name of the ship save to a variable called shipName
                        let shipName
                        switch (victimShip) {
                            case 29990:
                                shipName = "Loki"
                                break;
                            case 29988:
                                shipName = "Proteus"
                                break;
                            case 29986:
                                shipName = "Legion"
                                break;
                            case 29984:
                                shipName = "Tengu"
                                break;
                        }
                        console.log(shipName + " dead - adding data");
                        for (let i = 0; i < res.data.victim.items.length; i++) {
                            if (subsystemIDArr.includes(res.data.victim.items[i].item_type_id)) {
                                const itemId = res.data.victim.items[i].item_type_id;
                                insertIntoT3Database(killID, itemId, killTime, res.data.solar_system_id, link);
                            }
                        }
                    }
                })
        })
        .catch(err => {
            console.log("error inserting into database");
            console.log(err);
        })
}

// '(killID BIGINT, type VARCHAR(255), name VARCHAR(255), itemID BIGINT, killmail_time TIMESTAMP, solar_system_id BIGINT link VARCHAR(255)'

const insertIntoT3Database = async (killID, itemID, killTime, solarSystemID, link) => {
    const type = checkType(itemID);
    axios.get(`https://esi.evetech.net/latest/universe/types/${itemID}/?datasource=tranquility`)
        .catch(err => {
            console.log(err)
        })
        .then((res) => {
            const name = res.data.name;
            client.query('INSERT INTO subsystems (killID, type, name, itemID, killmail_time, solar_system_id, link) VALUES ($1, $2, $3, $4, $5, $6, $7)', [killID, type, name, itemID, killTime, solarSystemID, link])
                .catch(err => {
                    console.log("error inserting into killmails table");
                    console.log(err);
                })
                .then(() => {
                    console.log("inserted into killmails table");
                })
        })
}

setInterval(pingZkill, 5000);

const logSubsystemsDatabase = () => {
    client.query('SELECT * FROM subsystems')
        .catch(err => {
            console.log("error getting data from database");
            console.log(err);
        })
        .then(res => {
            console.log(res.rows);
        })
}

logSubsystemsDatabase();

//log all of the unique subsystem names in the database and the number of times they have been used
const logSubsystemsAndQuantities = () => {
    client.query('SELECT name, COUNT(name) FROM subsystems GROUP BY name ORDER BY COUNT(name) DESC')
        .catch(err => {
            console.log("error getting data from database");
            console.log(err);
        })
        .then(res => {
            console.log(res.rows);
        }
        )
}

logSubsystemsAndQuantities();
