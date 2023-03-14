import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Update User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a user data', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        passwordHash: await hash('123456', 10),
        phone: null,
        userPhoto: null,
        sapCode: ['1234567'],
      },
    })

    const authResponse = await request(app.server).post('/auth').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .put(`/users/${user?.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'johndoe-updated@example.com',
        sapCode: ['1234567', '7654321'],
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.user.email).toEqual('johndoe-updated@example.com')
    expect(response.body.user.sapCode).toContain('1234567')
    expect(response.body.user.sapCode).toContain('7654321')
  })
})
