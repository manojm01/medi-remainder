const express = require("express");
const ejs = require("ejs");
const path = require('path');
const bodyParser = require("body-parser");
require('./server/model/connection');
var favicon = require('serve-favicon');
const userController = require('./server/controllers/userController');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("assets"));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'assets')))
    // app.use(favicon(path.join(__dirname, 'public', 'images/favicon.png ')));
    // const router = require("./router")

// app.get("/", (req, res) => {
//     res.render("register")
// })

// app.use('/'.router);

// var datetime = new Date();
// var time2 = datetime.toLocaleTimeString();
// console.log(time2)
// if(time2=="3:09:00 pm"){
//     console.log("alert");
// }
port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.use('/', userController);