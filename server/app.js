require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const logger = require('morgan')

const apiRouter = require('./routes/api')

mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
const mongoDB = mongoose.connection
mongoDB.on('error', console.error.bind(console, 'MongoDB connection error: '))
mongoDB.once('open', () => console.log('MongoDB connected'))
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', apiRouter)

module.exports = app;
