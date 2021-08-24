const express = require('express')
const router = express.Router()
const { User } = require('../models/users')
import auth from '../middleware/auth'

router.get('/', auth, async (req, res) => {
  let user = await User.findById(req.params.username)
  res.send(user.portfolio)
})

router.put('/', auth, async (req, res) => {
  let user = await User.findById(req.body._id)

  const newCrypto = {
    name: req.body.name,
    buyPrice: req.body.buyPrice,
    amount: req.body.amount,
  }

  try {
    await User.updateOne(user, {
      $push: {
        portfolio: {
          newCrypto,
        },
      },
    })

    res.send(user)
  } catch (err) {
    console.log(err.message)
  }
})
module.exports = router
