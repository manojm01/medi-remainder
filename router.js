const express = require('express')
const request = require('request')
var router = express.Router();

router.get("/", (req, res) => {
    res.render('index');
});



module.exports = router