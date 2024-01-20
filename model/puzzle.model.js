const mongoose = require('mongoose')

let puzzleSchema = new mongoose.Schema({
    image: String,
    ans: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
})

module.exports = mongoose.model('puzzle', puzzleSchema)