import express from 'express'
import coinbase from '../routes/coinbaseRoutes'
import users from '../routes/users'
import auth from '../routes/auth'
import portfolio from '../routes/portfolio'

module.exports = function (app) {
  app.use(express.json())

  app.use('/api/coinbase', coinbase)
  app.use('/api/users', users)
  app.use('/api/auth', auth)
  app.use('/api/portfolio', portfolio)
}
