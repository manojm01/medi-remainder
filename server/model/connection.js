const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mediremainder:medi1234@cluster0.sw6sc.mongodb.net/MedicareDB', {useNewUrlParser:true} , (err)=>{

    if(!err){console.log('MongoDB Connection Succeeded');}
    else {console.log('Error in DB Connection: '+ err);}

});

require('./userModel');
// mongodb+srv://mediremainder:medi1234@cluster0.sw6sc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority