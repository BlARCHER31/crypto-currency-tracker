import express from 'express'
import coinbaseApiClient from '../services/coinbaseApiClient'
import upholdApiClient from '../services/upholdApiClient'

const coinbase = function getCoinbaseRoutes() {
  const router = express.Router()
  router.get('/:coin', handleGetCoinSpotPrice)
  return router
}

async function handleGetCoinSpotPrice(req, res) {
  const coin = req.params.coin + '-USD'
  let currencyWorth
  try {
    currencyWorth = await coinbaseApiClient.fetchCryptoCurrentWorth(coin)
    if (!currencyWorth) {
      currencyWorth = await upholdApiClient.fetchCryptoCurrentWorth(coin)
    }
    res.send(currencyWorth)
  } catch (e) {
    res
      .status(404)
      .send(
        `Could not find ${coin.toUpperCase()} on Coinbase or Uphold. ${
          e.message
        }`
      )
  }
}

module.exports = coinbase()
