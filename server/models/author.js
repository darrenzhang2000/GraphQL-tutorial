const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: String,
    age: Number
})

//creates and exports a mongoose model called Author using the authorSchema
module.exports = mongoose.model('Author', authorSchema)
