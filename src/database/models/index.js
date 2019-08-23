'use stric'

import mongoose  from 'mongoose'
import userSchema from '../schemas/userSchema'
import postSchema from '../schemas/postSchema'
import comentSchema from '../schemas/commentSchema'

const userModel = mongoose.model('users', userSchema)
const postModel = mongoose.model('posts', postSchema)
const commentModel = mongoose.model('comments', comentSchema)

module.exports = {
  userModel,
  postModel,
  commentModel
}
