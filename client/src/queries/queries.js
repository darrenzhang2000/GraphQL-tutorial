import { gql } from 'apollo-boost'

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

const getBooksQuery = gql`
{
    books {
        name
        id
    }
}
`

/*
query variables
! means non-empty
*/
const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        } 
    }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation }