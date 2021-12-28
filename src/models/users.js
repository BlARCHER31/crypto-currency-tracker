const mongoose = require('mongoose')
const Joi = require('joi')
import jwt from 'jsonwebtoken'

const portfolioSchema = new mongoose.Schema({
  cryptoName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    min: 0,
    max: 1000000000,
    required: true,
  },
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 1,
    max: 20,
    required: true,
  },
  username: {
    type: String,
    min: 5,
    max: 20,
    required: true,
  },
  email: {
    type: String,
    min: 1,
    max: 50,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 255,
    required: true,
  },
  portfolio: [portfolioSchema],
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, name: this.name },
    process.env.ACCESS_TOKEN_SECRET
  )
  return token
}

const User = new mongoose.model('User', userSchema)

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(20).required(),
    username: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(1).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  })

  return schema.validate(user)
}

exports.User = User
exports.validate = validateUser
