const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: {type: String, minlength: 3, required: true},
  content: {type: String, minlength: 10, required: true},
  imagePath: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = mongoose.model('Post', PostSchema)
