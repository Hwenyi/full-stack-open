const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((maxLikesBlog, blog) => {
    return blog.likes > maxLikesBlog.likes ? blog : maxLikesBlog
  }, blogs[0])
}

const _ = require('lodash')

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorBlogs = _.groupBy(blogs, 'author')
  const authorBlogCounts = _.map(authorBlogs, (blogs, author) => ({
    author,
    blogs: blogs.length,
  }))
  const maxBlogsAuthor = _.maxBy(authorBlogCounts, 'blogs')

  return {
    author: maxBlogsAuthor.author,
    blogs: maxBlogsAuthor.blogs,
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorLikes = _.groupBy(blogs, 'author')
  const authorLikeCounts = _.map(authorLikes, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes'),
  }))
  const maxLikesAuthor = _.maxBy(authorLikeCounts, 'likes')

  return {
    author: maxLikesAuthor.author,
    likes: maxLikesAuthor.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}