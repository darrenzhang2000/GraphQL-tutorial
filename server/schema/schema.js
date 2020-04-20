const graphql = require("graphql")
const _ = require("lodash")
const Book = require('../models/book')
const Author = require('../models/author')

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
                //looks at the Author collection (same as table) and finds the author
                //whose id matches with parent.authorId
                return Author.findById(parent.authorId)
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
                // return _.filter(books, { authorId: parent.id})

                //goes through the collection model and finds all books 
                //whose authorId is equal parent.id
                return Book.find({ authorId: parent.id })
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
                // return _.find(books, { id: args.id })
     
                //we want to go through the Book collection and find the book
                //that matches the id
                return Book.findById(args.id)
            },
        },
        //entry point author
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // return _.find(authors, { id: args.id })

                //go through the Author collection and find the Author 
                //whose id matches the id specified by the user
                return Author.findById(args.id)
            }
        },

        //get all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return all books

                return Book.find({})
            }
        },
        
        //get all authors
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args){
                // return all authors

                return Author.find({})
            }
        }
    },
})

/*
mutation 
*/
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString}, 
                genre: {type: GraphQLString}, 
                authorId: {type: GraphQLID}
            },
            resolve(parent, args){
                let newBook = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                 })
                return newBook.save()
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}                
            }, 
            resolve(parent, args){
                let newAuthor = new Author({
                    name: args.name,
                    age: args.age
                })
                return newAuthor.save()
            }
        }

    }
})

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addAuthor: {
//             type: AuthorType,
//             args: {
//                 name: { type: GraphQLString },
//                 age: { type: GraphQLInt }
//             },
//             resolve(parent, args){
//                 let author = new Author({
//                     name: args.name,
//                     age: args.age
//                 });
//                 return author.save();
//             }
//         }
//     }
// });



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
