import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Refresh User Token by Cookie (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        phone: null,
        userPhoto: null,
        sapCode: ['1234567'],
      })

    const authResponse = await request(app.server).post('/auth').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .get('/auth/refresh')
      .set('Cookie', cookies)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
      refreshToken: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
      expect.stringContaining('token='),
    ])
  })
})
