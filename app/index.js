const express = require('express')
const app = express()
const endpoints = require('./endpoints')

app.use(require('body-parser').json())
app.use('/', endpoints)

module.exports = app
