'use strict'

const fs = require('fs')
const http = require('http')
const https = require('https')
const path = require('path')
const config = require('./config/config').get(process.env.NODE_ENV)
const express = require('./middleware/express')
var app = express()
require('./db/mongoose')

if ((config.use_https === 'true')) {
    const privateKey = fs.readFileSync(path.join(__dirname, '/', config.key))
    const certificate = fs.readFileSync(path.join(__dirname, '/', config.cert))

    const options = {
      key: privateKey,
      cert: certificate
    }
    options.rejectUnauthorized = false
    https.createServer(options, app).listen(config.app_port)
} else {
    http.createServer(app).listen(config.app_port)
}
// console.log('ENVIRONMENT : ' + process.env.NODE_ENV)
console.log('PORT : ' + config.app_port)
