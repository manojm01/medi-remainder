const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Medicine = mongoose.model('Medicine');



router.get('/', (req, res) => {
    res.render("index");
});

router.get('/set', (req, res) => {
    res.render("set");

});
router.post('/set', (req, res) => {
    var medicine = new Medicine();
    medicine.medi_name = req.body.medi_name;
    medicine.morning = req.body.morning;
    medicine.afternoon = req.body.afternoon;
    medicine.night = req.body.night;
    console.log(req.body);
    // console.log(medicine.medi_name);
    console.log(req.body.morning);
    console.log(req.body.afternoon);
    console.log(req.body.night);

    medicine.save()
    .then(data => { res.render('index') })
    .catch(err => { console.log(err); })

});
router.get('/login', (req, res) => {
    res.render("register");
});

router.get('/signup', (req, res) => {
    res.render("signup");
});




router.post('/', (req, res) => {
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.email = req.body.email;
    user.password = req.body.password;
    user.gender = req.body.gender;

    user.save()
        .then(data => { res.render('index') })
        .catch(err => { console.log(err); })
})


module.exports = router;