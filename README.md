# GraphQL-tutorial

Structure of this app:
Client (browser)
- Graphical (temporary substitute for backend development) - Replaced with React and Apollo
- React 
- Apollo - lets the frontend talk to the gql server
    - Apollo creates 

Server (Node.js)
- Express App
- GraphQL Server

Database
- MongoDB

![image](https://user-images.githubusercontent.com/44158788/79810188-76a6a600-8340-11ea-9b92-8e00a885139d.png)

![image](https://user-images.githubusercontent.com/44158788/79810211-832afe80-8340-11ea-92b0-4cd46341d2c0.png)


Steps to set up backend:
1. set up express server
2. set up graphQL http object to handle requests sent to /graphqldocum
    * include the schema, which tells you the shape of the documents
    * include graphiql for debugging

3. create schemas and create models for each schema, including the custom object types as well as the root query and mutations
    * types have name and fields
    * queries and mutations have type, args, and resolve
4. set up user in mongo atlas and connect using mongoose
5. modify queries to interact with db

Mongoose guide:
Documents are sets of key - value pairs, such as: { "hello": 1, "world": 2 }
Schemas map to collections and define the shape of documents within that collection 
    * kind of like the blueprint, which specifies the types of each key. 
To use schemas, we have to pass into mongoose.model(modelName, schema), 
    which creates a model.
    * ids are created by default for each instance of models (called documents)

GQL guide:
queries and mutations have fields
GraphQLNonNull enforces the user pass in information for specified fields


Apollo Guide:
https://www.apollographql.com/docs/react/get-started/
1. Install apollo-boost
2. import ApolloClient 
3. create an instance of ApolloClient while passing in the uri: "http://localhost:4000/graphql"
4. wrap the app component using ApolloProvider, while passing in the client 
