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
  if(!user) return res.status(404).send('User not found')

  const newCrypto = {
    name: req.body.name,
    buyPrice: req.body.buyPrice,
    amount: req.body.amount,
  }

  try {
    await User.updateOne(
      user,
      {
        $push: {
          portfolio: newCrypto,
        },
      },
      { new: true }
    )
    res.send(user)
  } catch (err) {
    console.log(err.message)
  }
})

router.delete('/', auth, async (req, res) => {
  let user = await User.findOne({ username: req.body.username })
  if (!user) return res.status(404).send('User not found')

  let portfolioObject = await user.portfolio.id(req.body._id)
  if (!portfolioObject)
    return res.status(404).send('Nothing found in the portfolio with that ID.')

  await user.portfolio.id(req.body._id).remove()
  await user.save()
  res.send(user)
})

module.exports = router
