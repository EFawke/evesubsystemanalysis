//this used to be for the about page, but now it's just for the api key

const express = require('express');
const aboutRouter = express.Router();

aboutRouter.get('/', (req, res, next) => {
    const string = "hey"
    res.status(200).send(string);
});

module.exports = aboutRouter;