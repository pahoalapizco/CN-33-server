import { postModel } from '../database/models'

export const createPost = async (postData) => {
  try {
    return await postModel.create(postData)
  } catch (error) {
    return null
  }
}

export const getPost = async () => {
  try {
    return await postModel.find().populate('comments')
  } catch (error) {
    return null
  }
}

export const updatePost = async (filter, update) => {
  try {
    return await postModel.findOneAndUpdate(filter, update, { new: true })
  } catch (error) {
    return error
  }
}
