import { userModel } from '../database/models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Agregamos
Date.prototype.addDate = function (days) {
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
    const user = await userModel.findOne({ email })
    if (!user || !bcrypt.compareSync(pass, user.password)) { return null }

    return createToken(user)
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

export const updateUser = async (filter, update) => {
  try {
    return await userModel.findOneAndUpdate(filter, update, { new: true })
  } catch (error) {
    return error
  }
}

module.exports = {
  addUser,
  doLogin,
  findUser,
  updateUser
}
