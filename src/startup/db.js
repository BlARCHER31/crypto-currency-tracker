const mongoose = require('mongoose')
const config = require('config')

module.exports = function () {
  // const db = process.env.DB_INFO
  const db = config.get('app.db')
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log(`Connected to MongoDB Atlas ${db}`))
    .catch(e => console.log(e.message))
}
