const express = require('express')
const logger = require('morgan')

const app = express()
app.use(logger('dev'))
app.use(express.json())

app.use(function(req, res, next) {
  res.end('Ola amigo')
})

module.exports = app;
