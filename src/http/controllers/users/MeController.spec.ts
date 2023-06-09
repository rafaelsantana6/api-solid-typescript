import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Me (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile by authentication on header', async () => {
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

    const { token } = authResponse.body

    const response = await request(app.server)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.userData).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      })
    )
  })
})
