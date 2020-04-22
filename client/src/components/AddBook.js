import React, { Component } from "react"
import { graphql } from "react-apollo"
import { getAuthorsQuery } from "../queries/queries"

class AddBook extends Component {
    displayAuthors() {
        let data = this.props.data
        console.log("a", data.authors)
        if (data.loading) {
            return <option disabled>Loading Authors</option>
        } else {
            return data.authors.map((author) => (
                <option key={author.id} value={author.name}>
                    {author.name}
                </option>
            ))
        }
    }

    render() {
        this.displayAuthors()
        return (
            <form>
                <div className="field">
                    <label>
                        Book name:
                        <input type="text" />
                    </label>
                </div>

                <div className="field">
                    <label>
                        Genre:
                        <input type="text" />
                    </label>
                </div>

                <div className="field">
                    <label>
                        Author:
                        <select>
                            <option>Select Author</option>
                            {/* <option value="Patrick Rothfuss">
                                Patrick Rothfuss
                            </ option>
                            <option value="Terry Pratcheit">
                                Terry Pratcheit
                            </option>
                            <option value="Brandon Sanderson">
                                Brandon Sanderson
                            </option> */}
                            {this.displayAuthors()}
                        </select>
                    </label>
                </div>
            </form>
        )
    }
}

//binds the author query response (this.props.data) to addBook component
export default graphql(getAuthorsQuery)(AddBook)
