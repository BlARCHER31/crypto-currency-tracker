import express from 'express'
import cryptoPrice from '../routes/cryptoPrices'
import users from '../routes/users'
import auth from '../routes/auth'
import portfolio from '../routes/portfolio'
import cors from 'cors'

module.exports = function (app) {
  app.use(express.json())
  app.use(cors())

  app.use('/api/crypto-price', cryptoPrice)
  app.use('/api/users', users)
  app.use('/api/auth', auth)
  app.use('/api/portfolio', portfolio)
}
