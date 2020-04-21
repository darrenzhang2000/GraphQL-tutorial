import React, { Component } from "react"
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

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
        console.log(this.props)
        return (
            <div id="book-list">
                <ul>
                    <li>Book1</li>
                </ul>
            </div>
        )
    }
}

//binds the query to BookList, which is 
export default graphql(getBooksQuery)(BookList)