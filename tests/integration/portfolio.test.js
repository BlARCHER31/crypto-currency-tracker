const request = require('supertest')
const { User } = require('../../src/models/users')
let server

describe('Portfolio Routes', () => {
  beforeEach(() => {
    server = require('../../src/index')
  })
  afterEach(async () => {
    await User.deleteMany({})
    server.close()
  })

  describe('Getting Portfolio', () => {
    test.only('Should return portfolio Object', async () => {
      const user = new User({
        name: 'User1',
        username: 'User1',
        email: 'User1@gmail.com',
        password: 'password',
        portfolio: [
          { cryptoName: 'btc', amount: 2 },
          { cryptoName: 'xrp', amount: 2 },
          { cryptoName: 'eth', amount: 2 },
        ],
      })
      await user.save()
      const token = new User().generateAuthToken()

      const res = await request(server)
        .get(`/api/portfolio/${user._id}`)
        .set('x-auth-token', token)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('cryptoName', user.portfolio.cryptoName)
    })
  })
})
