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


var mediSchema = new mongoose.Schema({
    medi_name: {
        type: String,
    },
    morning: {
        type: String,
    },
    afternoon: {
        type: String,
    },
    night: {
        type: String,
    }
});

mongoose.model('Medicine', mediSchema); // (name of schema, schema Object)