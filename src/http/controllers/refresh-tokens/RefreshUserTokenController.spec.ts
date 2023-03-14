import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'

describe('Refresh User Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: null,
      userPhoto: null,
    })

    const authResponse = await request(app.server).post('/auth').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const oldRefreshToken = authResponse.body.refreshToken

    const response = await request(app.server).patch('/auth/refresh').send({
      refreshToken: oldRefreshToken,
    })

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
