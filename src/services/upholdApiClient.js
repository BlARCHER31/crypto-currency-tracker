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
      logger.error(
        `Unable to find ${currencyPair} crypto on UpHold. ` + error.message
      )
    }
  }
}

export default new UpholdApiClient()
