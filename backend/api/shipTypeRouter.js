const express = require('express');
const shipTypeRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('zkill.db');

shipTypeRouter.get(`/:weekday/:shipName/:time`, (req, res, next) => {
  const shipName = req.params.shipName;
  const shipTypeId = shipSelector(shipName)
  const time = req.params.time
  db.all(`SELECT * FROM esi WHERE weekday = '${req.params.weekday}' AND ship_type_id = '${shipTypeId}' AND killmail_time LIKE '%T${time}:%';`,
    (err, rows) => {
      if (err) {
        console.log(err)
      } else {
        const data = rows.length;
        const parsedData = JSON.parse(data);
        res.send({ parsedData });
        console.log(parsedData);
      }
    })
})

const shipSelector = (shipType) => {
  let shipTypeId = ''
  if (shipType === 'Golem') {
    return shipTypeId = 28710;
  }
  if (shipType === 'Paladin') {
    return shipTypeId = 28659
  }
  if (shipType === 'Vargur') {
    return shipTypeId = 28665
  }
  if (shipType === 'Kronos') {
    return shipTypeId = 28661
  }
  if (shipType === 'Revelation') {
    return shipTypeId = 19720
  }
  if (shipType === 'Phoenix') {
    return shipTypeId = 19726
  }
  if (shipType === 'Moros') {
    return shipTypeId = 19724
  }
  if (shipType === 'Naglfar') {
    return shipTypeId = 19722
  }
  if (shipType === 'Gila') {
    return shipTypeId = 17715
  }
  if (shipType === 'Praxis') {
    return shipTypeId = 47466
  }
  if (shipType === 'Nestor') {
    return shipTypeId = 33472
  }
  if (shipType === 'Leshak') {
    return shipTypeId = 47271
  }
  if (shipType === 'Rattlesnake') {
    return shipTypeId = 17918
  }
  if (shipType === 'Heron') {
    return shipTypeId = 605
  }
  return shipTypeId;
}

module.exports = shipTypeRouter;