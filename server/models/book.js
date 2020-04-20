const mongoose = require('mongoose')
const Schema = mongoose.Schema

//we don't have to specify id because mongodb automatically generates unique id for each instance
const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})

module.exports = mongoose.model("Book", bookSchema) 