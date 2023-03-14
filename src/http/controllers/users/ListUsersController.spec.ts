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
        sapCode: ['1234567'],
      },
    })

    const secondUser = await prisma.user.create({
      data: {
        name: 'Joe Doe',
        email: 'joedoe@example.com',
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
      .get(`/users`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.users).toHaveLength(2)
    expect(response.body.users[0]).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: null,
      userPhoto: null,
      isActive: true,
      createdAt: expect.any(String),
      role: 'SELLER',
      sapCode: ['1234567'],
    })
    expect(response.body.users[1]).toEqual({
      id: expect.any(String),
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      phone: null,
      userPhoto: null,
      isActive: true,
      createdAt: expect.any(String),
      role: 'SELLER',
      sapCode: ['1234567'],
    })
  })
})
