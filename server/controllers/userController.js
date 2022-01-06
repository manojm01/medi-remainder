const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', (req, res) => {
    res.render("index");
});
router.get('/login', (req, res) => {
    res.render("signup");
});



router.post('/', (req, res) => {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.gender = req.body.gender;

    user.save()
        .then(data => { res.render('index') })
        .catch(err => { console.log(err); })
})


module.exports = router;