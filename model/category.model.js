const mongoose = require('mongoose')

let categorySchema = new mongoose.Schema({
    name : String,
    image : String
})

module.exports = mongoose.model('category',categorySchema)