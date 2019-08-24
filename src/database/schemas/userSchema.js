'use stric'

import mongoose  from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Hombre', 'Mujer']
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: 'posts'
  }]
}, { timestamps: true })

mongoose.Types.ObjectId.prototype.valueOf = function () {
  return this.toString()
}

userSchema.pre('save', function(next) {
  let user = this
  bcrypt.genSalt(10, function(error, salt) {
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) { return next(error) }
      user.password = hash
      next()
    })
  })
})

module.exports = userSchema
