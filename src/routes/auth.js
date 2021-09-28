import Joi from 'joi'
const express = require('express')
const router = express.Router()
import _ from 'lodash'
import bcrypt from 'bcrypt'

const { User } = require('../models/users')

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (!user)
    return res.status(400).send({ message: 'Invalid email or password.' })

  try {
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!validatePassword)
      return res.status(400).send({ message: 'Invalid email or password.' })
    const token = user.generateAuthToken()
    res.send(token)
  } catch (err) {
    console.log(err)
  }
})

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(1).max(20).required().email(),
    password: Joi.string().min(0).max(255).required(),
  })

  return schema.validate(req)
}

module.exports = router
