import { userModel } from '../database/models'
import jwt from 'jsonwebtoken'

// Agregamos 
Date.prototype.addDate = function(days) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

const createToken = (userData) => {
  const exp = new Date().addDate(5).getTime()
  const payload = {
    _id: userData._id,
    email: userData.email,
    name: userData.name,
    exp
  }
  const token = jwt.sign(payload, process.env.SECRET)
  return { token }
}

const addUser = async (userData) => {
  try {
    const newUser = await userModel.create(userData)
    return createToken(newUser)
  } catch (error) {
    return error
  }
}

const doLogin = async (email, pass) => {
  try {
    const login =  await userModel.findOne({email})
    return createToken(login)
  } catch (error) {
    return error
  }
}

const findUser = async (filter) => {
  try {
    return await userModel.findOne(filter)
  } catch (error) {
    return error
  }
}

module.exports = {
  addUser,
  doLogin,
  findUser
}