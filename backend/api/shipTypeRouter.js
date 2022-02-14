const express = require('express');
const shipTypeRouter = express.Router();
const { Client } = require('pg');
const { Pool } = require('pg');

shipTypeRouter.get(`/:shipName`, (req, res, next) => {
  const shipName = req.params.shipName;
  const shipTypeId = shipSelector(shipName);
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  pool.connect()
  pool.query(`SELECT * FROM esi WHERE ship_type_id = '${shipTypeId}';`, (err, response) => {
    if (err) {
      pool.end()
      res.sendStatus(404)
      console.log(err)
    } else {
      const data = response.rows
      let heatmap = {
        Monday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Tuesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Wednesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Friday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Saturday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Sunday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      };
      var d = new Date();
      d.setMonth(d.getMonth() - 3);
      for (let i = 0; i < data.length; i++) {
        let time = Number(data[i].killmail_time.substring(11, 13));
        const day = data[i].weekday;
        const killmailDate = new Date(data[i].killmail_time);
        if (day === "Monday" && killmailDate > d) {
          heatmap.Monday[time] += 1;
        }
        if (day === "Tuesday" && killmailDate > d) {
          heatmap.Tuesday[time] += 1;
        }
        if (day === "Wednesday" && killmailDate > d) {
          heatmap.Wednesday[time] += 1;
        }
        if (day === "Thursday" && killmailDate > d) {
          heatmap.Thursday[time] += 1;
        }
        if (day === "Friday" && killmailDate > d) {
          heatmap.Friday[time] += 1;
        }
        if (day === "Saturday" && killmailDate > d) {
          heatmap.Saturday[time] += 1;
        }
        if (day === "Sunday" && killmailDate > d) {
          heatmap.Sunday[time] += 1;
        }
      }
      res.status(200).send(heatmap);
      pool.end()
    }
  })
})

const isKillTooOld = (a, b) => {
  const threeMonthsAgo = a;
  const killmailTime = b;
  return dates.compare(threeMonthsAgo, killmailTime)
}

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