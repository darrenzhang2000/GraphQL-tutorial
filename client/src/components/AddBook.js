import React, { Component } from "react"
import { graphql } from "react-apollo"
import { flowRight as compose } from "lodash"
import { getAuthorsQuery, addBookMutation, getBooksQuery} from "../queries/queries"

class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            genre: "",
            author: "",
        }
    }

    displayAuthors() {
        // let data = this.props.data
        // since we added compose (another query), we have to specify the query
        let data = this.props.getAuthorsQuery
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

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId,
            }, 
            refetchQueries: [{query: getBooksQuery}],
        })
    }

    render() {
        this.displayAuthors()
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <label>
                        Book name:
                        <input
                            type="text"
                            onChange={(e) => {
                                this.setState({ name: e.target.value })
                            }}
                        />
                    </label>
                </div>

                <div className="field">
                    <label>
                        Genre:
                        <input
                            type="text"
                            onChange={(e) => {
                                this.setState({ genre: e.target.value })
                            }}
                        />
                    </label>
                </div>

                <div className="field">
                    <label>
                        Author:
                        <select
                            onChange={(e) =>
                                this.setState({ authorId: e.target.value })
                            }
                        >
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
                <button>+</button>
            </form>
        )
    }
}

//binds the author query response (this.props.data) to addBook component
// export default graphql(getAuthorsQuery)(AddBook)

//if we want to have a second query, we need to use compose
//that way, we can bind both queries to addBook
export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)
