const mongoose = require('mongoose')
const config = require('config')

module.exports = async function () {
  const db = process.env.DB_INFO
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log(`Connected to MongoDB Atlas`))
    .catch(e => console.log(e.message))
}
