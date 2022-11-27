const express = require('express');
const searchRouter = express.Router();
const { Client } = require('pg');

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}


searchRouter.get(`/:userInput`, (req, res, next) => {
  const userInput = req.params.userInput;
  const caseCorrected = titleCase(userInput)
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
  client.query(`SELECT ship_class_id, ship_class_name FROM ship_types WHERE ship_class_name LIKE '${caseCorrected}%';`, (err, response) => {
    if (err) {
      client.end()
      res.status(404).send(err + userInput);
    } else {
        client.end()
        const data = JSON.stringify(response.rows);
        const theData = JSON.parse(data)
        let theArray = []
        for(let i = 0; i < theData.length; i++){
          theArray.push(theData[i].ship_class_name)
        }
        console.log(theData)
        res.status(200).send(theData);

    }
  })
})

module.exports = searchRouter;