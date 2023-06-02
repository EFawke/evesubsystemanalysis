//this used to be for the about page, but now it's just for the api key

const express = require('express');
const keyRouter = express.Router();

keyRouter.get('/', (req, res, next) => {
    // Hash the API key or not, fuck it
    const apiKey = "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";
    res.status(200).send(apiKey);
});

module.exports = keyRouter;
