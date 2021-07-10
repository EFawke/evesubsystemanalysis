const express = require('express');
const esiRouter = express.Router();
const axios = require('axios');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('zkill.db');
const esiDbInit = require('../utils/esiDbInit');

//add time between for the brackets that'll get added in the frontend here.
//maybe making this a get('/', (req, res, next) => {
//}) route that gets called by the front end is what needs to happen...

esiRouter.get(`/:weekday/:shipName/:time`, (req, res, next) => {
  const shipName = req.params.shipName;
  const shipTypeId = shipSelector(shipName)
  const time = req.params.time
    db.all(`SELECT * FROM esi WHERE weekday = '${req.params.weekday}' AND ship_type_id = '${shipTypeId}' AND killmail_time LIKE '%T${time}:%';`, 
    (err, rows) => {
      if(err){
        console.log(err)
      } else {
        const data = rows.length;
        const parsedData = JSON.parse(data);
        res.send({parsedData});
      }
    })
})

esiRouter.get(`/totalDestroyed/:shipName`, (req, res, next) => {
  const shipName = req.params.shipName;
  const shipTypeId = shipSelector(shipName);
  db.all(`SELECT * FROM esi WHERE ship_type_id = '${shipTypeId}';`, (err, rows) => {
    if(err){
      console.log(err)
    } else {
      const data = rows.length;
      const totalDestroyed = JSON.parse(data);
      res.send({totalDestroyed})
    }
  })
})

// esiRouter.get(`/totalDays`, (req, res, next) => {
//   db.get(`SELECT DISTINCT WHERE killmail_time LIKE '_/_/_T_' FROM esi;`, (err, rows) => {
//     if(err){
//       console.log(err)
//     } else {
//       const data = rows.length;
//       const totalDays = JSON.parse(data);
//       console.log(totalDays)
//       res.send({totalDays})
//     }
//   })
// })

const shipSelector = (shipType) => {
  let shipTypeId = ''
  if(shipType === 'Golem'){
      return shipTypeId = 28710;
  }
  if(shipType === 'Paladin'){
      return shipTypeId = 28659
  }
  if(shipType === 'Vargur'){
      return shipTypeId = 28665
  }
  if(shipType === 'Kronos'){
      return shipTypeId = 28661
  }
  if(shipType === 'Revelation'){
      return shipTypeId = 19720
  }
  if(shipType === 'Phoenix'){
      return shipTypeId = 19726
  }
  if(shipType === 'Moros'){
      return shipTypeId = 19724
  }
  if(shipType === 'Naglfar'){
      return shipTypeId = 19722
  }
  if(shipType === 'Gila'){
      return shipTypeId = 17715
  }
  if(shipType === 'Praxis'){
      return shipTypeId = 47466
  }
  if(shipType === 'Nestor'){
      return shipTypeId = 33472
  }
  if(shipType === 'Leshak'){
      return shipTypeId = 47271
  }
  if(shipType === 'Rattlesnake'){
      return shipTypeId = 17918
  }
  if(shipType === 'Heron'){
    return shipTypeId = 605
  }
  return shipTypeId;
}

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

const updateDayOfTheWeek = () => {
  let length = '';
  db.all(`SELECT * FROM esi`, (err, table) => {
    if (err) {
      console.log(err);
    }
    length = table.length;
    for (let i = 0; i < length; i++) {
      db.get(`SELECT * FROM esi LIMIT 1 OFFSET ${i};`, (err, row) => {
        if (err || row === undefined) {
          return;
        } else {
          const weekday = dateToDay(row.killmail_time);
          const zkill_id = row.killmail_id;
          const sql = 'UPDATE esi ' +
                      `SET weekday = '${weekday}'`
                      + ` WHERE killmail_id = ${zkill_id};`
          db.run(sql, (err) => {
            if(err){
              return;
            }
          })
        }
      })
    }
  })
}

//initialise the database which will hold ESI data
esiDbInit();

const esiDatabaseFiller = () => {
  //get the length of the table and save the number to a variable called length.
  let length = '';
  db.all(`SELECT * FROM zkill`, (err, table) => {
    if (err) {
      console.log(err)
    }
    length = table.length
    //loop through the zkill table by row.
    for (let i = 0; i < length; i++) {
      //LIMIT 1 OFFSET [0/1/2] is because you can't search for ROWID in SQL.
      //I'm looping through every row in the zkillboard database and using the column from there to make my call to the eve swagger interface.
      db.get(`SELECT * FROM zkill LIMIT 1 OFFSET ${i};`, (err, row) => {
        if (err) {
          console.log(err)
        }
        let hash = row.hash;
        let zkill_id = row.zkill_id;
        //queries esi with all kill_id's and hash's in the database.
        axios.get(`https://esi.evetech.net/latest/killmails/${zkill_id}/${hash}/?datasource=tranquility`)
          .then(response => {
            //insert into the esi table the new data from the esi.
            db.run(`INSERT INTO esi (killmail_id, killmail_time, ship_type_id, weekday)
                            VALUES($killmail_id, $killmail_time, $ship_type_id, $weekday);`,
              {
                $killmail_id: response.data.killmail_id,
                $killmail_time: response.data.killmail_time,
                $ship_type_id: response.data.victim.ship_type_id,
                $weekday: ''
              }, (err) => {
                if (err) {
                  // console.log(err)
                  return;
                }
              })
          })
          .catch(function (error) {
            if(error){
              return;
            }
            if (error.response) {
              // console.log(error.response.headers);
              // console.log(error.response.data);
              // console.log(error.response.status);
              console.log(row.hash);
              console.log(row.zkill_id);
            }
          })
      })
    }
  });
}

esiDatabaseFiller();
updateDayOfTheWeek();
setInterval(esiDatabaseFiller, 1000 * 60 * 3);
setInterval(updateDayOfTheWeek, 1000 * 60 * 3);

module.exports = esiRouter;