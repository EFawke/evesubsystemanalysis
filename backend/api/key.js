//this used to be for the about page, but now it's just for the api key

const express = require('express');
const keyRouter = express.Router();

keyRouter.get('/', (req, res, next) => {
    // Hash the API key or not, fuck it
    const apiKey = "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";
    res.status(200).send(apiKey);
});

module.exports = keyRouter;
