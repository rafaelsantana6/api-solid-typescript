import request from 'supertest'
import { randomUUID } from 'node:crypto'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Delete User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a user', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        passwordHash: await hash('123456', 10),
        phone: null,
        userPhoto: null,
      },
    })

    const response = await request(app.server).delete(`/users/${user.id}`)

    expect(response.statusCode).toEqual(204)
  })
})
