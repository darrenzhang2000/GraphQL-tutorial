import React, { Component } from "react"
import { graphql } from "react-apollo"
import { getBooksQuery } from "../queries/queries"

// const getBooksQuery = gql`
//     {
//         books {
//             name
//             id
//         }
//     }
// `
class BookList extends Component {
    displayBooks() {
        var data = this.props.data
        if (data.loading) {
            return <div>Loading books...</div>
        } else {
            return data.books.map((book) => {
                return <li key={book.id}>{book.name}</li>
            })
        }
    }

    render() {
        console.log(this.props)
        return (
            <div id="book-list">
                <ul>{this.displayBooks()}</ul>
            </div>
        )
    }
}

//binds the query results (this.props.data) to BookList, which is
export default graphql(getBooksQuery)(BookList)
