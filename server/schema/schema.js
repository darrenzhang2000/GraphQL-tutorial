const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString} = graphql

const BookType = new GraphQLObjectType({
    name: "Book",
    field = () => ({
        id: { type: GraphQLString},
        id: { type: GraphQLString},
        id: { type: GraphQLString}
    })
})

//the entry points
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    field: {
        type: BookType,
        args: {id: { type: GraphQLString} }, 
        resolve(parent, args){
            //get data from db
        }
    }
})

/*
In the frontend, you do something like:
book(id: '123){
    name
    genre
}
*/