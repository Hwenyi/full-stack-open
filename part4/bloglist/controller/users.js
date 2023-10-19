const usersRoter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRoter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRoter.post('/', async (request , response, next) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if(existingUser) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  try{
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRoter