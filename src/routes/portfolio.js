const express = require('express')
const router = express.Router()
const { User } = require('../models/users')
import auth from '../middleware/auth'

router.get('/', auth, async (req, res) => {
  let user = await User.findById(req.params.username)
  res.send(user.portfolio)
})

router.put('/', auth, async (req, res) => {
  const { _id, cryptoName: name, buyPrice, amount } = req.body

  let user = await User.findById(_id)
  if (!user) return res.status(404).send('User not found')

  const newCrypto = {
    cryptoName: name,
    purchaseDetails: { buyPrice: buyPrice, amount: amount },
  }

  try {
    let cryptoAlreadyThere = await User.findOne({
      'portfolio.cryptoName': name,
    })
    if (!cryptoAlreadyThere) {
      user.portfolio.push(newCrypto)
      await user.save()
      res.send(user)
    } else {
      let subdoc = user.portfolio
      subdoc.forEach(obj => {
        if (obj.cryptoName === name) {
          obj.purchaseDetails.push({ buyPrice, amount })
        }
        return
      })

      await user.save()
      res.send(user)
    }
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
