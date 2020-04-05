// need to npm i graphql and express-graphql
const express = require('express')
//this is like a supercharged endpoint where you send all of your queries
const graphqlHTTP = require('express-graphql') 
const schema = require('./schema/schema')

const app = express()

//when you make a request to /graphql, you want to tell the server to use the 
//graphqlHTTP object which knows how to handle gql requests
app.use('./graphql', graphqlHTTP({ //schemas are needed so you know what data you want back
    schema
}))

app.listen(4000, ()=>{
    console.log('listening at port 4000')
})


