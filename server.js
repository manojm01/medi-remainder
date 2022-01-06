const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
require('./server/database/connection');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("register")
})

app.listen(3000,()=>{
    console.log("Server is ready");
})