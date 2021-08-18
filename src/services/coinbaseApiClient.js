import logger from 'loglevel'
import config from 'config'
import axios from 'axios'

class CoinbaseApiClient{

    async fetchCryptoCurrentWorth(currencyPair) {
        const url = `${currencyPair}/spot`
        
        let response
        try {
            response = await axios.get(url,
                {
                    baseURL: config.get('coinbase.spotBaseURL')
                })
            return response.data.data
        } catch(error) {
            logger.error('Unable to find that crypto ' + error.message)
        }
    }
}

export default new CoinbaseApiClient()