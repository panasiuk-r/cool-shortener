import request from 'supertest'

import app from '../routes/routes'

import { redis } from '../db/connection'
import { Url } from '../models/Url'

describe('/shorten', () => {
  test("should respond with 302 for a valid url", async () => {   
    jest.spyOn(Url, 'findByPk').mockResolvedValue(null)
    jest.spyOn(redis, 'get').mockResolvedValue('https://www.google.com')

    const response = await request(app).get('/shorten?url=https://www.google.com')
    expect(response.statusCode).toBe(302)
  })

  test("should respond with 302 for a valid url", async () => {
    const mockedModel: Object = {
      getDataValue: jest.fn()
    }
    const findByPk = jest.fn().mockResolvedValue(mockedModel)
    
    jest.spyOn(Url, 'findByPk').mockImplementation(findByPk)
    
    jest.spyOn(redis, 'get').mockResolvedValue('')
    jest.spyOn(redis, 'set').mockResolvedValue('OK')

    const response = await request(app).get('/shorten?url=https://www.google.com')
    expect(response.statusCode).toBe(302)
  })

  test("should respond with 200 for a valid url", async () => {
    jest.spyOn(Url, 'create').mockResolvedValue({getDataValue: jest.fn()})
    jest.spyOn(redis, 'set').mockResolvedValue('OK')

    const response = await request(app).post('/shorten').send({url: 'https://www.youtube.com'})
    expect(response.statusCode).toBe(200)
  })
})