const express = require("express");
const ejs = require("ejs");
const path = require('path');
const bodyParser = require("body-parser");
<<<<<<< HEAD
require('./server/database/connection');


=======
>>>>>>> 7dd36c3d8c8400c70a1c89bf01eee4cd8c5a25d4
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("assets"));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'assets')))

const router = require("./router")

app.get("/", (req, res) => {
    res.render("index")
})

// app.use('/'.router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})