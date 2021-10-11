import logger from 'loglevel'
import config from 'config'
import axios from 'axios'

class UpholdApiClient {
  async fetchCryptoCurrentWorth(currencyPair) {
    const url = `${currencyPair}`

    let response
    try {
      response = await axios.get(url, {
        baseURL: config.get('uphold.spotBaseURL'),
      })
      return response.data
    } catch (error) {
      res.send(error.message).status(404)
      logger.error('Unable to find that crypto ' + error.message)
    }
  }
}

export default new UpholdApiClient()
