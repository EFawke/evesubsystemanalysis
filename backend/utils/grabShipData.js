const axios = require('axios');
const { Client } = require('pg');
const express = require('express');
const complicatedShipGrabber = express.Router();

const logInvGroups = () => {
    axios.get('http://sde.zzeve.com/invGroups.json')
        .catch(err => {
            if (err) {
                return;
            }
        })
        .then(res => {
            console.log(res.data)
        })
}

const logInvCategories = () => {
    axios.get('http://sde.zzeve.com/invCategories.json')
        .catch(err => {
            if (err) {
                return;
            }
        })
        .then(res => {
            console.log(res.data)
        })
}

const logInvTypes = () => {
    axios.get('http://sde.zzeve.com/invTypes.json')
        .catch(err => {
            if (err) {
                return;
            }
        })
        .then(res => {
            console.log(res.data)
        })
}

let client;

if (!process.env.DATABASE_URL) {
    client = new Client()
} else {
    client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

const invGroupsDbInit = () => {
    client.connect();
    client.query(`CREATE TABLE IF NOT EXISTS inv_groups(
    groupID integer PRIMARY KEY,
    categoryID INTEGER NOT NULL,
    groupName TEXT NOT NULL,
    iconID TEXT,
    useBasePrice BIT NOT NULL,
    anchored BIT NOT NULL,
    anchorable BIT NOT NULL,
    fittableNonSingleton BIT NOT NULL,
    published BIT NOT NULL
);`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('this part fine')
        }
        client.end();
    });
}

const invCategoriesDbInit = () => {
    client.connect();
    client.query(`CREATE TABLE IF NOT EXISTS inv_categories(
    categoryID integer PRIMARY KEY,
    categoryName TEXT NOT NULL,
    iconID INTEGER,
    published BIT NOT NULL,
  );`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('this part fine')
        }
        client.end();
    });
}

const invTypesDbInit = () => {
    client.connect();
    client.query(`CREATE TABLE IF NOT EXISTS inv_types(
    typeID integer PRIMARY KEY,
    groupID INTEGER NOT NULL,
    typeName TEXT NOT NULL,
    description TEXT,
    
  );`, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('this part fine')
        }
        client.end();
    });
}

// module.exports = logThisStuff;