import { createPost, getPost, updatePost } from '../actions/postActions';
import { addCommentToPost } from '../actions/commentActions'
import { addUser, doLogin, updateUser } from '../actions/userAction'
import { storeUpload } from '../utils'
import { PubSub } from 'apollo-server';

const pubSub = new PubSub;
const POST_ADDED = 'POST_ADDED';

const books = [
  {
    "title": "Harry Potter and the chamber of secrets",
    "author": "J.K. Rowling"
  }
]

const resolvers = {
  Subscription: {
    postAdded: {
      subscribe: (parent, args, context, info) => pubSub.asyncIterator([POST_ADDED])
    },
  },
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
    addPost: async (parent, { data }, { user }, info) => {
      console.log("TCL: user", user)
      const newPost = await createPost(data);
      const filter = { _id: user._id };
      const update = { $push: { 'post': newPost._id } };
      await (updateUser(filter, update));
      pubSub.publish(
        POST_ADDED,
        { postAdded: newPost });
      return newPost;
    },
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