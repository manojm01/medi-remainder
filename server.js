const express = require("express");
const ejs = require("ejs");
const path = require('path');
const bodyParser = require("body-parser");
require('./server/model/connection');
const userController = require('./server/controllers/userController');


const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("assets"));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'assets')))

// const router = require("./router")

// app.get("/", (req, res) => {
//     res.render("register")
// })

// app.use('/'.router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

app.use('/', userController);