import { commentModel } from '../database/models'
import { updatePost } from '../actions/postActions'

const addCommentToPost = async (commentData) => {
  try {
    const commentCreated = await commentModel.create(commentData)
    const filter = { _id: commentData.postID }
    const update = { $push: { comments: commentCreated._id } }
    await updatePost(filter, update)
    return commentCreated
  } catch (error) {
    return null
  }
}

module.exports = {
  addCommentToPost
}
