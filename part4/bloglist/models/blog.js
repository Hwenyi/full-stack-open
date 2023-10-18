const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // eslint-disable-line no-param-reassign
    delete returnedObject._id // eslint-disable-line no-param-reassign
    delete returnedObject.__v // eslint-disable-line no-param-reassign
  },
})

module.exports = mongoose.model('Blog', blogSchema)