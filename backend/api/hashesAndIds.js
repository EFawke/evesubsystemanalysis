console.log("hashes and ids connected");
const axios = require('axios');
const { Client } = require('pg');

//this file is just to collect the hashes and IDs from zkillboard api and store them in a database.

//making the table if not exists
const client = new Client()
client.connect()
    .catch(err => {
        console.log("client is down");
        console.log(err);
    })
    .then((res) => {
        console.log("client is connected");
    })

//make a database table to store the data
client.query('CREATE TABLE IF NOT EXISTS zkillboardData (killID BIGINT, hash VARCHAR(255), killTime TIMESTAMP, link VARCHAR(255))')


//function to make the api call to zkillboard

const axiosZkillData = () => {
    axios("https://redisq.zkillboard.com/listen.php?ttw=1", {
        headers: {
            'accept-encoding': 'gzip',
            'user-agent': 'Johnson Kanjus - evesubsystemanalysis.com - teduardof@gmail.com',
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
                console.log(response.data.package);
                
                // const killID = response.data.package.killID;
                // const hash = response.data.package.zkb.hash;
                // const killTime = response.data.package.killmail.killmail_time;
                // const link = response.data.package.zkb.href;
                // insertIntoDB(killID, hash, killTime, link);
            }
        });

}

axiosZkillData();

//run axiosZkillData every 5 seconds
setInterval(axiosZkillData, 5000);