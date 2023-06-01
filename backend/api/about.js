const express = require('express');
const aboutRouter = express.Router();

aboutRouter.get(`/`, (req, res, next) => {
    const string = `
    <h1>What is this?</h1>
    <p>This is a tool for players in Eve Online who are interested in manufacturing Tech 3 Subsystems.</p>
    <p>It was built primarily to assist in deciding which subsystems to manufacture.</p>
    <p>When making a decision on what to produce, it is important to factor in the demand for that item, as well as the current market conditions.</p>
    <p>As such, the subsystems page consists of two main sections: <strong>Subsystem Loss Tracker</strong> and <strong>Market Data</strong>.</p>
    <p>Once the data is loaded on the page, it is also fed into a query to an external AI, which assists in evaluating the current market for the subsystem you are viewing.</p>

    <h2>Subsystem Loss Tracker</h2>
    <p>These graphs give you a break-down of all of the subsystems of the type you are looking at that have been lost in the last 7 days.</p>
    <p>It also shows you how often the subsystem you are viewing has been lost relative to other subsystems.</p>
    <p>This provides a good indication of the current meta, and what people are actually using.</p>

    <h2>Market Data</h2>
    <p>This section shows you the current market conditions for the subsystem you are viewing.</p>
    <p>It displays daily average buy and sell prices for the subsystem in Jita and Amarr (sorry Dodixie).</p>
    <p>It also shows you the current market price for the materials required to manufacture the subsystem.</p>

    <h1>How do I use this?</h1>
    <p>To find different subsystems, you can use the search box at the top of the page.</p>
    <p>Alternatively, a table of all of the subsystems is available by clicking the gear icon in the top left corner of the page.</p>
    <p>Once you have found the subsystem you are interested in, you can click on it to view the data.</p>
    <p>Note: You may also toggle between subsystems by clicking on the segment of the pie chart you are interested in when using the Subsystem Loss Tracker.</p>
    `
    res.status(200).send(string);
})

module.exports = aboutRouter;