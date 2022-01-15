const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Medicine = mongoose.model('Medicine');
const alert = require('alert');
const bcrypt = require("bcrypt");
const { type } = require('express/lib/response');
// -----------------------------------------------
// -----------------------------------------------
router.get('/set/:id', function(req, res, next) {
    var userdata = User.findById(req.params.id,  (err, doc) =>{
        // console.log("doc:"+doc);
   
    // console.log("docemail: "+doc.email)
//    username = "Manoj" //this username will replace the actual username of the logged in user..
    // console.log(User().name);
    Medicine.find({ user_email: doc.email })
        .then(data => {
            if (!data) {
                console.log('Failed to retrieve the Medicine List: ' + err);
            } else {

                console.log("set render:"+data)
                res.render("set", {
                    medicineData: data
                });
                // console.log(userData)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erro retrieving user with id " })
        })
    });
});

router.post('/set', async (req, res) => {

    // var user = new User();
    // user.email = req.body.email;
    // console.log("user.email: "+user.email);
    // user.name = req.body.name;
    // console.log("user in set post: "+user);
    // let user1 =await  User.find({email: medicine.user_email});

    var medicine = new Medicine();
    medicine.user_name = "Admin";
    medicine.user_email = "admin@gmail.com";
    medicine.medi_name = req.body.medi_name;
    medicine.morning = req.body.morning;
    medicine.afternoon = req.body.afternoon;
    medicine.night = req.body.night

    medicine.save()
        .then(data => {
            // var user = new User();

            console.log("data before redirectngg  \n\n\n"+(user1));
            // console.log(user1[0].id)
            var id = user1[0].id
            // const uri = `set/{:id}`
            res.redirect(`set/${id}`);
        })
        .catch(err => { console.log(err); })
});

router.get('/', (req, res) => {
    res.render("signin");
});


router.get('/login', (req, res) => {
    res.render("signin");
});

router.get('/signup', (req, res) => {
    res.render("signup");
});


router.post('/signup', async(req, res) => {
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.email = req.body.email;
    user.gender = req.body.gender;
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);;

    user.save()
        .then(data => { 
            // console.log(data);
            res.render('index',{ userData:data}) 
        })
        .catch(err => { console.log(err); })
})
router.post('/signin', async(req, res) => {
    // console.log('Inside the bodyyy')
    // console.log(req.body);
    const body = req.body;
    const user = await User.findOne({ email: body.email });

    if (user) {
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            console.log("User found")
            console.log("User"+user)
            res.render('index',{userData:user})
          } else {
            console.log("Password  Not Found")
            alert("Please check email and password")
            res.redirect('login')
        }
    } else {
        //   res.status(401).json({ error: "User does not exist" });
        console.log("User does not exist")
        alert("Please check email")
        res.redirect('login')
    }

})

router.get('/:id', (req, res) => {
    Medicine.findByIdAndRemove(req.params.id, async (err, doc) => {
        if (!err) {
            console.log("delete doc: "+doc);
            console.log("delete: "+doc.user_email);
            let user1 =await  User.find({email:doc.user_email});
            var id = user1[0]._id
            // const uri = `set/{:id}`
            res.redirect(`set/${id}`);
            // res.redirect('/set');
        } 
        else { console.log('Error in medicine delete :' + err); }
    });
});

module.exports = router;