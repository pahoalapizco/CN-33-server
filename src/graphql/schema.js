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
    comments: [Comment]
  }

  type Comment {
    _id: ID,
    content: String,
    postID: ID
  }

  type Query {
    books: [Book]
    getPost: [Post]
  }

  input PostInput {
    title: String,
    content: String
  }

  input CommentInput {
    content: String!,
    postID: ID
  }

  type Mutation {
    addPost(data: PostInput) : Post
    addCommentToPost(data: CommentInput) : Comment
    updatePost(data: PostInput, postID: ID) : Post
  }
`
export default typesDefs