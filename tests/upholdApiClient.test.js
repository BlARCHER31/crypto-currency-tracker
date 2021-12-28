import mockAxios from 'axios'
import upholdApiClient from '../src/services/upholdApiClient'
jest.mock('axios')

describe('upholdApiClient', () => {
  test('should return price data', async () => {
    mockAxios.get.mockResolvedValue({ data: { btc: 21 } })
    const response = await upholdApiClient.fetchCryptoCurrentWorth('BTC-USD')

    expect(response).toEqual({ btc: 21 })
  })

  test('should log an error', async () => {
    mockAxios.get.mockRejectedValue(new Error('That Crypto Does not exist.'))
    const result = await upholdApiClient.fetchCryptoCurrentWorth('BTTD-USD')
    expect(result).toBeUndefined()
  })
})
