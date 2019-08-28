import { gql } from 'apollo-server'

const typesDefs = gql`
  directive @AuthDirective on QUERY | FIELD_DEFINITION | FIELD

  enum Gender {
    Hombre
    Mujer
  }

  type Book {
    title: String
    author: String
  }

  type Post {
    _id: ID
    title: String
    content: String
    likes: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    content: String
    postID: ID
  }

  type Token {
    token: String
  }

  type User {
    name: String
    lastname: String
    email: String
    gender: Gender
    profileImage: String
  }

  type Query {
    books: [Book]
    getPost: [Post] @AuthDirective
  }

  input PostInput {
    title: String
    content: String
  }

  input CommentInput {
    content: String!
    postID: ID
  }

  input UserInput {
    name: String
    lastname: String
    email: String
    password: String
    gender: Gender
    profileImage: Upload
  }

  type Subscription {
    postAdded: Post
  }

  type Mutation {
    addPost(data: PostInput) : Post
    addCommentToPost(data: CommentInput) : Comment
    updatePost(data: PostInput, postID: ID) : Post
    addUser(data: UserInput!) : Token,
    doLogin(email: String, password: String) : Token
  } 
`
export default typesDefs