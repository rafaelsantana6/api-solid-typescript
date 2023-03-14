import request from 'supertest'
import { randomUUID } from 'node:crypto'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Find User By ID (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find a user by id', async () => {
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

    const response = await request(app.server)
      .get(`/users/find-id/${user.id}`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(response.statusCode).toEqual(200)
  })
})
