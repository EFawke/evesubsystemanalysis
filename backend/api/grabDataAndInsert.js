const axios = require('axios');
const { Client } = require('pg');
const subsystemIDArr = [45622, 45623, 45624, 45625, 45626, 45627, 45628, 45629, 45630, 45631, 45632, 45633, 45586, 45587, 45588, 45589, 45590, 45591, 45592, 45593, 45594, 45595, 45596, 45597, 45610, 45611, 45612, 45613, 45614, 45615, 45616, 45617, 45618, 45619, 45620, 45621, 45598, 45599, 45600, 45601, 45602, 45603, 45604, 45605, 45606, 45607, 45608, 45609]

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
        console.log("client is down");
        console.log(err);
    })
    .then((res) => {
        console.log("client is connected");
        console.log(res)
    })

//make a database table to store the data
client.query('CREATE TABLE IF NOT EXISTS subsystems (assocKill BIGINT, killTime TIMESTAMP, location VARCHAR(255), type_id BIGINT, type_name VARCHAR(255))')
    .catch(err => {
        console.log(err);
    })
    .then((res) => {
        console.log("subsystems table created");
    })

//function to make the api call to zkillboard
const axiosZkillData = () => {
    //console.log("fetching data from zkillboard");
    axios("https://redisq.zkillboard.com/listen.php?ttw=1", {
        headers: {
            'accept-encoding': 'gzip',
            'user-agent': 'Johnson Kanjus - evesubsystemanalysis.com - teduardof@gmail.com',
            'connection': 'close'
        }
    })
        .catch(err => {
            if (err) {
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
                return;
            }
            if (response && response.data.package !== null && response.data.package !== undefined) {
                const items = response.data.package.killmail.victim.items;
                let loc = "";
                if(response.data.package.zkb.labels[3]){
                    loc = response.data.package.zkb.labels[3];
                };
                loc = loc.substring(4);
                for(let i = 0; i < items.length; i++){
                    if(subsystemIDArr.includes(items[i].item_type_id)){
                        const itemTypeId = items[i].item_type_id;
                        const assocKill = response.data.package.killmail.killmail_id;
                        const killTime = response.data.package.killmail.killmail_time;
                        const location = loc;                        
                        lookupSubsystemName(itemTypeId, assocKill, killTime, location);
                    }
                }
            }
        });

}

const lookupSubsystemName = (itemTypeId, assocKill, killTime, location) => {
    //console.log(killTime);
    axios(`https://esi.evetech.net/latest/universe/types/${itemTypeId}/?datasource=tranquility`)
        .catch(err => {
            if (err) {
                return;
            }
        })
        .then(response => {
            const itemTypeName = response.data.name;
            console.log(itemTypeName)
            client.query(`INSERT INTO subsystems (assocKill, killTime, location, type_id, type_name) VALUES (${assocKill}, '${killTime}', '${location}', ${itemTypeId}, '${itemTypeName}')`)
        })
}

axiosZkillData();

setInterval(axiosZkillData, 10000);