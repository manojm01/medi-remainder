const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    // fullName: {
    //     type: String,
    //    // required:true
    // },
    email: {
        type: String
    },
    
    password: {
        type: String
    }
});

mongoose.model('User',userSchema);  // (name of schema, schema Object)
// Employee -> should be in singular. In database it stores as 'employees' -> plural
