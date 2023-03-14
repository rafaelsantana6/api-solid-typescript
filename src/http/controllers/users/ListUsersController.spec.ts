import request from 'supertest'
import { randomUUID } from 'node:crypto'

import { app } from '@/app'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('List Users (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list users', async () => {
    const firstUser = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        passwordHash: await hash('123456', 10),
        phone: null,
        userPhoto: null,
      },
    })

    const secondUser = await prisma.user.create({
      data: {
        name: 'Joe Doe',
        email: 'joedoe@example.com',
        passwordHash: await hash('123456', 10),
        phone: null,
        userPhoto: null,
      },
    })

    const response = await request(app.server).get(`/users`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.users).toHaveLength(2)
    expect(response.body.users[0]).toEqual({
      id: firstUser.id,
      name: firstUser.name,
      email: firstUser.email,
      phone: firstUser.phone,
      userPhoto: firstUser.userPhoto,
      isActive: firstUser.isActive,
      createdAt: expect.any(String),
    })
    expect(response.body.users[1]).toEqual({
      id: secondUser.id,
      name: secondUser.name,
      email: secondUser.email,
      phone: secondUser.phone,
      userPhoto: secondUser.userPhoto,
      isActive: secondUser.isActive,
      createdAt: expect.any(String),
    })
  })
})
