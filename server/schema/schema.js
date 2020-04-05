const graphql = require("graphql")
const_ = require("lodash")

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

// dummy data
var books = [
    { name: "Name of the Wind", genre: "Fantasy", id: "1" },
    { name: "The Final Empire", genre: "Fantasy", id: "2" },
    { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLString },
        id: { type: GraphQLString },
        id: { type: GraphQLString },
    }),
})

/*
In the frontend, you do something like:
book(id: '123){
    name
    genre
}
*/
//the entry points
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                //get data from db
                return _.find(book, { id: args.id })
            },
        },
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})
