const express = require('express')
const router = express.Router()
import _ from 'lodash'
import bcrypt from 'bcrypt'
const { User, validate } = require('../models/users')

router.post('/register', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('Email already registered.')

  user = await User.findOne({ username: req.body.username })
  if (user) return res.status(400).send('Username taken.')

  try {
    const user = new User(
      _.pick(req.body, ['name', 'username', 'email', 'password'])
    )

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const token = user.generateAuthToken()
    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .send(_.pick(user, ['_id', 'username', 'email']))
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
