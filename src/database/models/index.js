'use stric'

import mongoose  from 'mongoose'
import userSchema from '../schemas/userSchema'
import postSchema from '../schemas/postSchema'

const userModel = mongoose.model('users', userSchema)
const postModel = mongoose.model('posts', postSchema)

module.exports = {
  userModel,
  postModel
}
