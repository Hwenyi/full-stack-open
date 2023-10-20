const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    //{ username: 1, name: 1 } 指定了要包括的用户字段。这里，我们指定要包括 username 和 name 字段，值为 1 表示包括它们，而值为 0 将排除它们
    //获取博客文章时，相关的用户信息（username 和 name）将一起返回，而不需要额外的查询
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  })

  const user = request.user //userExtractor对令牌核验过的user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  blog.user = user._id

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id) //user.blogs是一个blog id数组
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response, next) => {
  try{
    const blog = await Blog.findByIdAndRemove(request.params.id)

    const user = request.user//发起删除请求的用户

    if(!user || blog.user.toString() !== user.id.toString()){
      return response.status(401).json({ error: 'operation not permitted' })
    }

    user.blogs = user.blogs.filter(b => b.toString()!== blog.id.toString())

    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async(request, response, next) => {
  const { title, url, author, likes } = request.body
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, url,author,likes }, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
