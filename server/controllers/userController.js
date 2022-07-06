const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Medicine = mongoose.model('Medicine');
const alert = require('alert');
const bcrypt = require("bcrypt");
const webpush = require("web-push");
// -----------------------------------------------
router.get('/set/:id', function(req, res, next) {
    var userdata = User.findById(req.params.id, (err, doc) => {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return false;

        console.log("doc: is here get -----------" + doc);
        console.log("Id id here get -------------------" + req.params.id)

        Medicine.find({ user_email: doc.email })
            .then(data => {
                if (!data) {
                    console.log('Failed to retrieve the Medicine List: ' + err);
                } else {
                    console.log(" inside the get ---------------docemail: " + doc.email)
                    res.render("set", {
                        medicineData: data,
                        signinData: doc
                    });
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving user with id " })
            })
    });

});
router.get('/', (req, res) => {
    res.render("index");
    console.log("Inside the signin get request...")
});
router.get('/progress', (req, res) => {
    res.render("progress");
    console.log("Inside the signin get request...")
});
router.get('/login', (req, res) => {
    res.render("signin");
});
router.get('/signup', (req, res) => {
    res.render("signup");
});
router.post('/set/:id', async(req, res) => {
    var userdata = User.findById(req.params.id, async(err, doc) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return false;

        console.log("doc postt: is here -----------" + doc);
        console.log("Id in doc post here -------------------" + req.params.id)

        console.log(req.body);
        var medicine = new Medicine();

        medicine.user_name = doc.name;
        medicine.user_email = doc.email;
        medicine.medi_name = req.body.medi_name;
        medicine.morning = req.body.morning;
        medicine.afternoon = req.body.afternoon;
        medicine.night = req.body.night

        let user1 = await User.find({ email: medicine.user_email });
        medicine.save()
            .then(data => {
                var id = user1[0].id
                const uri = `set/${id}`;
                console.log("the uri is gere----" + uri);
                res.redirect(`/set/${id}`);
            })
            .catch(err => { console.log(err); })
    })
});
router.post('/signup', async(req, res) => {
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.email = req.body.email;
    user.gender = req.body.gender;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);;

    user.save()
        .then(data => {
            res.render('index', { userData: data })
        })
        .catch(err => { console.log(err); })
})
router.post('/signin', async(req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            console.log("User found")
            console.log("User" + user)
            res.render('index', { userData: user })
        } else {
            console.log("Password  Not Found")
            alert("Please check email and password")
            res.redirect('login')
        }
    } else {
        console.log("User does not exist")
        alert("Please check email")
        res.redirect('login')
    }

})
router.get('/:id', (req, res) => {
    Medicine.findByIdAndRemove(req.params.id, async(err, doc) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return false;

        console.log("Inside the delete route....")
        if (!err) {
            let user1 = await User.find({ email: doc.user_email });
            var id = user1[0].id
            res.redirect(`/set/${id}`);
            // res.redirect('/set');
        } else { console.log('Error in medicine delete :' + err); }
    });
});

// ------------------------------------notification start-----------------------

const publicVapidKey =
    "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
    "mailto:fksfshdlfh.com",
    publicVapidKey,
    privateVapidKey
);

// Subscribe Route
router.post("/subscribe", (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({ title: "Push Test" });

    setInterval(() => {
        var dateTime = new Date();
        var currentTime = dateTime.toLocaleTimeString();
        myTime = currentTime
        var myTime1 = "9:00:00 am";
        var myTime2 = "12:00:00 pm";
        var myTime3 = "08:00:00 pm";
        // console.log("Curretntime :    ----------------" + currentTime)
        if (currentTime == myTime1 || currentTime == myTime2 || currentTime == myTime3) {
            webpush
                .sendNotification(subscription, payload)
                .catch(err => console.error(err));
        }
    }, 1000);
});
// ------------------------------------notification end-----------------------

module.exports = router;