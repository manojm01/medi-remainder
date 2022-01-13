const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Medicine = mongoose.model('Medicine');
const alert = require('alert');
// -----------------------------------------------
// -----------------------------------------------
router.get('/set', function(req, res, next) {

    username = "Ashoka" //this username will replace the actual username of the logged in user..
    Medicine.find({ user_name: username })
        .then(data => {
            if (!data) {
                console.log('Failed to retrieve the Course List: ' + err);
            } else {

                // console.log(data)

                res.render("set", {
                    userData: data,
                    error: false
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
    var datetime = new Date();
    console.log(datetime);
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
            res.redirect("set");
        })
        .catch(err => { console.log(err); })
        // b5b57bd1d230cc81ea5173b2947adc02f618ac5a

});
router.get('/signin', (req, res) => {

});


router.get('/login', (req, res) => {
    res.render("signin");
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
router.post('/signin', (req, res) => {
    // console.log('Inside the bodyyy')
    // console.log(req.body);
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    User.find({ 'email': user.email }, (err, doc) => {
        if (doc.length == 0) {
            console.log("User Not Found")
            alert("Please check email and password")
            res.redirect('login')

        } else {
            if (!err) {
                console.log(doc)

                if (doc[0].email == user.email && doc[0].password == user.password) {

                    console.log("User found")
                    res.redirect('/');
                } else {
                    console.log("Password  Not Found")
                    alert("Please check email and password")
                    res.redirect('login')
                }
                // if (user.email == email && user.password == )
            } else { console.log('usser not found.. :' + err); }
        }
    });

})

router.get('/delete/:id', (req, res) => {
    Medicine.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/set');
        } else { console.log('Error in medicine delete :' + err); }
    });
});

module.exports = router;