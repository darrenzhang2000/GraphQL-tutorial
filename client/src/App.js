import React, { Component } from "react"
import BookList from "./components/BookList"
import ApolloClient, { gql } from "apollo-boost"
import { ApolloProvider } from "react-apollo"

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
})

class App extends Component {
    // componentDidMount = () => {
    //     client.query({
    //         query: gql`
    //             {
    //                 books {
    //                     name
    //                 }
    //             }
    //         `,
    //     }).then(data => console.log(data))
    //     .catch(error => console.error(error));
    // }
    render() {
        return (
            <div id="main">
                <ApolloProvider client={client}>
                    <h1>My Reading List</h1>
                    <BookList />{" "}
                </ApolloProvider>
            </div>
        )
    }
}

export default App
