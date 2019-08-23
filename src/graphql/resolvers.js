import { createPost, getPost, updatePost } from '../actions/postActions';
import { addCommentToPost } from '../actions/commentActions'
const books = [
  {
    "title": "Harry Potter and the chamber of secrets",
    "author": "J.K. Rowling"
  }
]

const resolvers = {
  Query: {
    books: () => books,
    getPost: async (parent, args, context, info) => {
      try {
        return await getPost()
      } catch(error) {
        return null
      }
    } 
  },
  Mutation: {
    addPost: async (parent, args, context, info) => await createPost(args.data),
    addCommentToPost: async (parent, { data }, context, info) => await addCommentToPost(data),
    updatePost: async (parent, { data, postID }, context, info) => {
      try {
        const filter = { _id: postID } 
        const update = { $set: { ...data } }
        return await updatePost(filter, update)
      } catch (error) {
        return error
      }
    }
  }
}

export default resolvers