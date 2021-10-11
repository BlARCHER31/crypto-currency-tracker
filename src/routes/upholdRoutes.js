import express from 'express'
import upholdApiClient from '../services/upholdApiClient'

const uphold = function getUpholdRoutes() {
  const router = express.Router()
  router.get('/:coin', handleGetCoinSpotPrice)
  return router
}

async function handleGetCoinSpotPrice(req, res) {
  const coin = req.params.coin + '-USD'
  try {
    const currencyWorth = await upholdApiClient.fetchCryptoCurrentWorth(coin)
    res.send(currencyWorth)
  } catch (e) {
    return res
      .status(404)
      .send(`Unable to fetch the crypto currency ${coin}: ${e.message}`)
  }
}

module.exports = uphold()
