const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comentSchema = new Schema({
  content: {
    type: String,
    required: true
  },  
  postID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'posts'
  }
}, { timestamps: true })

mongoose.Types.ObjectId.prototype.valueOf = function () {
  return this.toString()
}

module.exports = comentSchema
