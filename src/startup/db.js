const mongoose = require('mongoose')
const config = require('config')

module.exports = function () {
  let db
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'production'
  ) {
    db = process.env.DB_INFO
  } else if (process.env.NODE_ENV === 'test') {
    db = process.env.DB_TEST_INFO
  }
  mongoose
    .connect(db)
    .then(() => console.log(`Connected to MongoDB Atlas ${db}`))
    .catch(e => console.log(e.message))
}
