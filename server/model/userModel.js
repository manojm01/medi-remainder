const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String
    }
});

mongoose.model('User', userSchema); // (name of schema, schema Object)
// Employee -> should be in singular. In database it stores as 'employees' -> plural