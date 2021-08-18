const express = require('express')
const app = express()
require('dotenv').config()

require('./startup/db')()
require('./startup/routes')(app)

if (!process.env.ACCESS_TOKEN_SECRET) {
  console.error('FATAL ERROR: secret token not defined')
  process.exit(1)
}

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
  console.log(`Listening on ${port}...`)
})

module.exports = server
