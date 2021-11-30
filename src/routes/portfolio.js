const express = require('express')
const router = express.Router()
const { User } = require('../models/users')
import auth from '../middleware/auth'
import { calculateAverageBuyPrice } from './../util/averageBuyPrice'

router.get('/:_id', auth, async (req, res) => {
  let user = await User.findById(req.params._id)
  res.send(user.portfolio)
})

router.put('/', auth, async (req, res) => {
  const { _id, cryptoName: name, buyPrice, amount } = req.body

  let user = await User.findById(_id)
  if (!user) return res.status(404).send('User not found')

  const newCrypto = {
    cryptoName: name,
    amount: amount,
    buyPrices: [buyPrice],
    averageBuyPrice: buyPrice,
  }

  try {
    let cryptoAlreadyThere = await User.findOne({
      _id: _id,
      'portfolio.cryptoName': name,
    })

    if (!cryptoAlreadyThere) {
      user.portfolio.push(newCrypto)
      await user.save()
      return res.send(user)
    } else {
      let subdoc = user.portfolio
      subdoc.forEach(obj => {
        if (obj.cryptoName === name) {
          obj.amount += parseInt(amount)
          obj.buyPrices.push(buyPrice)
          obj.averageBuyPrice = calculateAverageBuyPrice(obj.buyPrices)
        }
        return
      })
    }
    await user.save()
    res.send(user)
  } catch (err) {
    res.send(err.message)
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
