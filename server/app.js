const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const api = express.Router()
api.use(cors())

api.get('/posts', function(req, res, next) {
  const posts = [
    {_id: 'h45h1j2djsi0a9dfm4', title: 'Ola amigo', content: 'Amigo estou aqui..'},
    {_id: 'h45h1j2djsi0a9dg6a', title: 'Hello my friend', content: 'I\'m here..'},
    {_id: 'h45h1j2djsi0a9fads', title: 'Ahola muchacho', content: 'Joy estoy aqui..'}
  ]
  res.json(posts)
})

app.use('/api', api)

module.exports = app;
