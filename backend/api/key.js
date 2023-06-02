//this used to be for the about page, but now it's just for the api key

const express = require('express');
const keyRouter = express.Router();

keyRouter.get('/', (req, res, next) => {
    // Hash the API key or not, fuck it
    const apiKey = "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";
    res.status(200).send(apiKey);
});

module.exports = keyRouter;
