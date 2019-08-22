import { postModel } from '../database/models'

export const createPost = async (postData) => {
  try{
    return await postModel.create(postData)
  } catch(error){
    return null
  }
}

export const getPost = async () => {
  try {
    return await postModel.find()
  } catch(error){
    return null
  }
}

