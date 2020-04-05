// need to npm i graphql and express-graphql
const express = require('express')
//this is like a supercharged endpoint where you send all of your queries
const graphqlHTTP = require('express-graphql') 

const app = express()

app.use('./graphql', graphqlHTTP)

app.listen(4000, ()=>{
    console.log('listening at port 4000')
})

