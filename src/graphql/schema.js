import { gql } from 'apollo-server'

const typesDefs = gql`
  type Book {
    title: String,
    author: String
  }

  type Post {
    _id: ID,
    title: String,
    content: String,
    likes: Int
  }

  type Query {
    books: [Book]
    getPost: [Post]
  }

  input PostInput {
    title: String,
    content: String
  }

  type Mutation {
    addPost(data: PostInput) : Post
  }
`
export default typesDefs