const express = require('express');
const router = express.Router();
const Trade = require("../models/trades");

router.post('/trades',  async (req, res) => {
    const trade = await Trade.create(req.body)
    res.status(201).json(trade.dataValues)
})

router.get('/trades', async (req, res) => {
    const trades = await Trade.findAll()
    res.status(200).json(
        trades.sort((a, b) => a.id - b.id)
    )
})

router.get('/trades/:id', async function(req, res) {

    const thisTrade = await Trade.findOne({
        where: {
            id: req.params.id
        }
    });
    if(thisTrade) {
        res.status(200).json(thisTrade)
    } else {
        res.status(404).send("ID not found")
    }
});

/*
* normally i would've created a nice looking "bucket"/catch-all handling for non supported http verbs but lack of time due to all routes 404'ing for me
* */
router.delete('/trades/:id', async function(req, res) {
        res.status(405).end()
});
router.put('/trades/:id', async function(req, res) {
    res.status(405).end()
});
router.patch('/trades/:id', async function(req, res) {
    res.status(405).end()
});


router.get('/', function(req, res, next) {
    res.send('<p> trades route test works (BUT all of these these routes 404 for me ) </p>');
})

module.exports = router;
