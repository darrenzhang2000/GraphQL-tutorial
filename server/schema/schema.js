const graphql = require("graphql")
const _ = require("lodash")

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql

// dummy data
var books = [
    { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
    { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
    { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3"},
]

var authors = [
    {name: 'Patrick Rothfuss', age: 44, id:'1'},
    {name: 'Brandon Sanderson', age: 52, id:'2'},
    {name: 'Terry Pratchett', age: 66, id: '3'}
]

const BookType = new GraphQLObjectType({
    name: "Book",
    /* Need to wrap everything inside of fields in a function 
    because we AuthorType is defined AFTER this block of code.
    Without (), there would be an error saying authorId not defined.
    Using a function delays makes it so that the code inside the function
    runs only after everything else is defined.*/
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, { id: parent.authorId })
            }
        }
    }),
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt},
        books: { 
            type: GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, { authorId: parent.id})
            }
        }
     })

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
        //entry point book
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //get data from db
                return _.find(books, { id: args.id })
            },
        },
        //entry point author
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(authors, { id: args.id })
            }
        },

        //get all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        
        //get all authors
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})
