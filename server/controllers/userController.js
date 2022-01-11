const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Medicine = mongoose.model('Medicine');

// -----------------------------------------------
// -----------------------------------------------
router.get('/set', function(req, res, next) {

    username = "Ashoka" //this username will replace the actual username of the logged in user..
    Medicine.find({ user_name: username })
        .then(data => {
            if (!data) {
                console.log('Failed to retrieve the Course List: ' + err);
            } else {
                console.log(data)

                res.render("set", {
                    userData: data
                });
                // console.log(userData)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erro retrieving user with id " })
        })

});

// --------------------------------------------------
// --------------------------------------------------


router.get('/', (req, res) => {
    res.render("index");
});

router.get('/set', (req, res) => {
    res.render("set");

});
router.post('/set', (req, res) => {

    var user = new User();
    user.name = req.body.name;


    // console.log(req.body);

    var medicine = new Medicine();
    medicine.user_name = "Ashoka";
    medicine.medi_name = req.body.medi_name;
    medicine.morning = req.body.morning;
    medicine.afternoon = req.body.afternoon;
    medicine.night = req.body.night;
    // console.log(medicine.medi_name);

    medicine.save()
        .then(data => {
            console.log((data))

            res.redirect("set");
        })
        .catch(err => { console.log(err); })
        // b5b57bd1d230cc81ea5173b2947adc02f618ac5a

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