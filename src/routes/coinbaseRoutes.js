import express from 'express'
import coinbaseApiClient from '../services/coinbaseApiClient'

const coinbase = function getCoinbaseRoutes() {
  const router = express.Router()
  router.get('/v1/spot/:coin', handleGetCoinSpotPrice)
  return router
}

async function handleGetCoinSpotPrice(req, res) {
  const coin = req.params.coin + '-USD'
  try {
    const currencyWorth = await coinbaseApiClient.fetchCryptoCurrentWorth(coin)
    res.send(currencyWorth)
  } catch (e) {
    return res
      .status(500)
      .send(`Unable to fetch the crypto currency ${coin}: ${e.message}`)
  }
}

module.exports = coinbase()
