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