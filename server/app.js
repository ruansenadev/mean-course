require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const logger = require('morgan')
const path = require('path')

const postsRouter = require('./routes/posts')
const usersRouter = require('./routes/users')

mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
const mongoDB = mongoose.connection
mongoDB.on('error', console.error.bind(console, 'MongoDB connection error: '))
mongoDB.once('open', () => console.log('MongoDB connected'))
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/images', express.static(path.join('server/images')))

app.use('/users', usersRouter)
app.use('/api/posts', postsRouter)

module.exports = app;
