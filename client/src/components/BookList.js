import React, { Component } from "react"
import { gql } from 'apollo-boost'

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

class BookList extends Component {
    render() {
        return (
            <div id="book-list">
                <ul>
                    <li>Book1</li>
                </ul>
            </div>
        )
    }
}

export default BookList