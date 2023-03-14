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
      },
    })

    const response = await request(app.server).put(`/users/${user?.id}`).send({
      email: 'johndoe-updated@example.com',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.user.email).toEqual('johndoe-updated@example.com')
  })
})
