import { createPost, getPost, updatePost } from '../actions/postActions';
import { addCommentToPost } from '../actions/commentActions'
import { addUser, doLogin } from '../actions/userAction'
import { storeUpload } from '../utils'

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
    },
    addUser: async (parent, { data }) => {
      try {
        const { createReadStream } = await data.profileImage
        const stream = createReadStream()
        const { url } = await storeUpload(stream)
        const newUserInfo = {
          ...data,
          profileImage: url
        }
        return await addUser(newUserInfo)
      } catch (error) {
        return error
      }
    },
    doLogin: async (parent, { email, password }) => {
      try {
        return await doLogin(email, password)
      } catch (error) {
        return error
      }
    }
  }
}

export default resolvers