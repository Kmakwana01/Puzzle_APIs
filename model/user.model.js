const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique : true
    },
    username : {
        type: String,
        required: true,
        unique : true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    gender : {
        type: String,
        enum : ['Male','Female'],
        default : null
    },
})

module.exports = mongoose.model('users', userSchema)