// need to npm i graphql and express-graphql
const express = require('express')
//this is like a supercharged endpoint where you send all of your queries
const graphqlHTTP = require('express-graphql') 
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require("cors")

const app = express()

//allow cross-origin requests
app.use(cors())

//connect with mongoose- make sure there is an instance of mongoose db running
//i used mongoose atlas
mongoose.connect('mongodb+srv://darren:test123@cluster0-eajys.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open', ()=> {
    console.log('connected to database')
})

//when you make a request to /graphql, you want to tell the server to use the 
//graphqlHTTP object which knows how to handle gql requests
app.use('/graphql', graphqlHTTP({ //schemas are needed so you know what data you want back
    schema,
    graphiql: true //graphiql is a very useful tool for debugging
}))

app.listen(4000, ()=>{
    console.log('listening at port 4000')
})

