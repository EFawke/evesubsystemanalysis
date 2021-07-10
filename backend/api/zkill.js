const express = require('express');
const zkillRouter = express.Router();
const axios = require('axios');
const zkillDbInit = require('../utils/zkillTableInit');
const sqlite3 = require('sqlite3').verbose();

zkillDbInit();

let db = new sqlite3.Database('zkill.db');

//Try changing this to call pages 1 to 20 every 6 hours instead.
//Think I need to make it wait until the operation is finished somehow in the for loop.
//Using just a straight up for implementation seems to be making it fail from going too fast.
const zkillDatabaseFiller = () => {
        axios.get(`https://zkillboard.com/api/kills/w-space/`, 
        {
            headers: {
            'accept-encoding':'gzip',
            'user-agent': 'Johnson Kanjus - rage-roll.com - teduardof@gmail.com',
            'connection': 'close'
        }
    })
            .then(response => {
                const wormholeData = (response.data)
                for (let i = 0; i < Object.keys(wormholeData).length; i++) {
                    const currentZKillId = Object.keys(wormholeData)[i]
                    const currentHash = Object.values(wormholeData)[i]
                    let values = {
                        $zkill_id: currentZKillId,
                        $hash: currentHash
                    };
                    db.run(`INSERT INTO zkill (zkill_id, hash) VALUES ($zkill_id, $hash)`,
                    values
                    , function(err){
                        if(err){
                            return;
                        }
                    })
                }
        })
}

zkillDatabaseFiller()
setInterval(zkillDatabaseFiller, 1000 * 60 * 5)

module.exports = zkillRouter;