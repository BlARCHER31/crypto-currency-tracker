const express = require('express')
const router = express.Router()
const { User } = require('../models/users')
import auth from '../middleware/auth'

router.get('/:_id', auth, async (req, res) => {
  let user = await User.findById(req.params._id)
  res.send(user.portfolio)
})

router.put('/', auth, async (req, res) => {
  const { _id, cryptoName: name, amount } = req.body

  let user = await User.findById(_id)
  if (!user) return res.status(404).send('User not found')

  const newCrypto = {
    cryptoName: name,
    amount: amount,
  }

  try {
    let cryptoAlreadyThere = await User.findOne({
      _id: _id,
      'portfolio.cryptoName': name,
    })

    if (!cryptoAlreadyThere) {
      user.portfolio.push(newCrypto)
      await user.save()
    } else {
      let subdoc = user.portfolio
      subdoc.forEach(obj => {
        if (obj.cryptoName === name) {
          obj.amount += parseInt(amount)
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

router.put('/update-amount', auth, async (req, res) => {
  const { username, amount, cryptoId } = req.body

  let user = await User.findOne({ username })
  if (!user) return res.status(404).send('User not found')

  try {
    let cryptoToUpdate = user.portfolio.id(cryptoId)
    cryptoToUpdate.amount = cryptoToUpdate.amount - amount
    await user.save()
    res.send(cryptoToUpdate)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.delete('/:user/:_id', auth, async (req, res) => {
  let user = await User.findOne({ username: req.params.user })
  if (!user) return res.status(404).send('User not found')

  let portfolioObject = await user.portfolio.id(req.params._id)
  if (!portfolioObject)
    return res.status(404).send('Nothing found in the portfolio with that ID.')

  await user.portfolio.id(req.params ._id).remove()
  await user.save()
  res.send(user)
})

module.exports = router
