import express from 'express'
import coinbase from '../routes/coinbaseRoutes'
import uphold from '../routes/upholdRoutes'
import users from '../routes/users'
import auth from '../routes/auth'
import portfolio from '../routes/portfolio'
import cors from 'cors'

module.exports = function (app) {
  app.use(express.json())
  app.use(cors())

  app.use('/api/uphold', uphold)
  app.use('/api/coinbase', coinbase)
  app.use('/api/users', users)
  app.use('/api/auth', auth)
  app.use('/api/portfolio', portfolio)
}
