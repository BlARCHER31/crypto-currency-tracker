import mockAxios from 'axios'
import coinbaseApiClient from '../src/services/coinbaseApiClient'
jest.mock('axios')

describe('coinbaseApiClient', () => {
  test('should return price data', async () => {
    mockAxios.get.mockResolvedValue({ data: { data: { btc: 21 } } })
    const response = await coinbaseApiClient.fetchCryptoCurrentWorth('BTC-USD')

    expect(response).toEqual({ btc: 21 })
  })

  test('should log an error', async () => {
    mockAxios.get.mockRejectedValue(new Error('That Crypto Does not exist.'))
    const result = await coinbaseApiClient.fetchCryptoCurrentWorth('BTTD-USD')
    expect(result).toBeUndefined()
  })
})
